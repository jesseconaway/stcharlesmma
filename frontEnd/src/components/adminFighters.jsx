import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle as questionMark } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sortItems from '../utils/sort';
import Pagination from './common/pagination';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';

const AdminFighters = () => {
    const [fighters, setFighters] = useState([]);
    const [fighter, setFighter] = useState({
        name: '',
        details: [],
        image: '',
        file: undefined,
        order: 999
    });
    const [tableInfo, setTableInfo] = useState({
        pageSize: 4,
        currentPage: 1,
        sortColumn: {
            path: 'name',
            order: 'asc'
        },
    })
    const [crudFunction, setCrudFunction] = useState('');
    const [currentItemID, setCurrentItemID] = useState('');
    const columns = [
        { label: 'Name', path: 'name' },
        { label: 'Details', path: 'details' },
        { label: 'Display Order', path: 'order' },
        { label: 'Image', path: 'image' },
        { label: '', key: 1 },
    ]

    const formElement = useRef(null);
    const formContainer = useRef(null);
    const detailsInput = useRef(null);
    const tableElement = useRef(null);

    const resetForm = () => {
        setFighter(
            {
                name: '',
                details: [],
                image: '',
                file: undefined,
                order: 999
            }
        )
        setCrudFunction('');
        setCurrentItemID('');
        formElement.current.reset();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fighter.details.length === 0) {
            toast.error('Fighter details cannot be empty');
            return;
        }

        if (crudFunction === 'create') {
            const formData = new FormData();
            formData.append('imageData', fighter.file[0]);
            const fileRes = await axios.post('/api/images', formData);
            const fighterRes = await axios.post('/api/fighters', fighter);
            if (fileRes.data === fighterRes.data) {
                toast.success('New Fighter Created');
                const fighterList = await axios.get('/api/fighters');
                setFighters(fighterList.data);
                resetForm();
                tableElement.current.scrollIntoView({ behavior: "smooth" });
            } else {
                toast.error('Something went wrong. Make sure image file type is .jpg or .png')
            }
        } if (crudFunction === 'update') {
            if (fighter.file) {
                const formData = new FormData();
                formData.append('imageData', fighter.file[0]);
                const oldFighterRes = await axios.get(`/api/fighters/${currentItemID}`);
                const fileDeleteRes = await axios.delete(`/api/images/${oldFighterRes.data.image}`);
                const fileRes = await axios.post('/api/images', formData);
                console.log(fileDeleteRes);
                console.log(fileRes);
            }

            const fighterRes = await axios.post(`/api/fighters/${currentItemID}`, fighter);
            if (fighterRes.status === 200) {
                toast.success('Fighter Updated');
                const fighterList = await axios.get('/api/fighters');
                setFighters(fighterList.data);
                resetForm();
                tableElement.current.scrollIntoView({ behavior: "smooth" });
            } else {
                toast.error('Something went wrong. Make sure image file type is .jpg or .png')
            }
        }
    };

    const handleUpdate = fighterToUpdate => {
        resetForm();
        setFighter({
            name: fighterToUpdate.name,
            details: fighterToUpdate.details,
            image: fighterToUpdate.image,
            order: fighterToUpdate.order
        });
        setCrudFunction('update');
        setCurrentItemID(fighterToUpdate._id);
        formContainer.current.scrollIntoView({ behavior: "smooth" });
    }

    const handleDelete = async (fighter) => {
        const fighterRes = await axios.delete(`/api/fighters/${fighter._id}`);
        const fileRes = await axios.delete(`/api/images/${fighter.image}`);
        if (fileRes.data === fighterRes.data) {
            toast.success('Fighter Deleted');
            const fighterList = await axios.get('/api/fighters');
            setFighters(fighterList.data);
        } else {
            toast.error('Something went wrong');
        }
    };

    const handleAddFile = (file) => {
        let newFighter = { ...fighter };
        newFighter.file = file;
        newFighter.image = file[0].name;
        setFighter(newFighter);
    }

    const handleSort = (sortColumn) => {
        let newTableInfo = { ...tableInfo };
        tableInfo.sortColumn = sortColumn;
        setTableInfo(newTableInfo);
    };

    const paginate = (page) => {
        let newTableInfo = { ...tableInfo };
        newTableInfo.currentPage = page;
        setTableInfo(newTableInfo);
    };

    const handleAddDetail = (classToAdd) => {
        let newFighter = { ...fighter };
        newFighter.details = [...fighter.details, classToAdd];
        setFighter(newFighter);
    };

    const handleFormUpdate = (eventTarget) => {
        let newFighter = { ...fighter };
        newFighter[eventTarget.name] = eventTarget.value;
        setFighter(newFighter);
    }

    const sortedData = sortItems(fighters, tableInfo.sortColumn.path, tableInfo.sortColumn.order);

    let paginatedData = sortedData.slice((tableInfo.currentPage - 1) * tableInfo.pageSize, tableInfo.currentPage * tableInfo.pageSize);

    let formClasses = crudFunction ? "formContainer is-visible" : "formContainer";

    const fetchFighters = async () => {
        const fighterList = await axios.get('/api/fighters');
        setFighters(fighterList.data);
    }

    useEffect(() => {
        fetchFighters();
    }, [])

    return (
        <>
            <h1 ref={tableElement}>FIGHTERS</h1>
            <p>Click a fighter's name to update</p>
            <ToastContainer />
            <table>
                <TableHeader columns={columns} sortColumn={tableInfo.sortColumn} onSort={handleSort} />
                <TableBody data={paginatedData} onDelete={handleDelete} onUpdate={handleUpdate} />
            </table>
            <div className='controls'>
                <Pagination
                    pageSize={tableInfo.pageSize}
                    currentPage={tableInfo.currentPage}
                    paginate={paginate}
                    itemCount={fighters.length}
                />
                <button onClick={() => {
                    resetForm();
                    setCrudFunction('create');
                    formContainer.current.scrollIntoView({ behavior: "smooth" });
                }}>New Fighter</button>
            </div>
            <div ref={formContainer} className={formClasses}>
                <form ref={formElement} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" value={fighter.name} onChange={(e) => {
                        let newFighter = { ...fighter };
                        newFighter.name = e.target.value;
                        setFighter(newFighter);
                    }} required />
                    <label htmlFor="details">Details <FontAwesomeIcon className="icon" title='Enter information like "Weight Class", "Organizations Fought Under", "Accolades", etc.. Enter each piece of information as a separate item.' icon={questionMark} /></label>
                    <input ref={detailsInput} id="details" name="details" />
                    <button className="success" type="button" onClick={() => {
                        if (detailsInput.current.value === "") {
                            toast.error('Please enter a value');
                            return;
                        }
                        handleAddDetail(detailsInput.current.value);
                        detailsInput.current.value = '';
                    }}>Add</button>
                    <ul>
                        {fighter.details.length > 0
                            && fighter.details.map(detail => {
                                return (
                                    <li className="fighterListItem" key={detail}>
                                        <p>{detail}</p>
                                        <div className="deleteIcon" onClick={() => {
                                            let newFighter = { ...fighter };
                                            newFighter.details = newFighter.details.filter(x => x !== detail);
                                            setFighter(newFighter);
                                        }}><div><span></span><span></span></div>
                                        </div>
                                    </li>
                                )
                            })}
                    </ul>
                    <label htmlFor="order">Display Order <FontAwesomeIcon className="icon" title='This controls the order in which fighters are displayed. "1" would be at the top of the page. Numbers can be repeated.' icon={questionMark} /></label>
                    <input id="order" type="number" name="order" value={fighter.order} onChange={(e) => handleFormUpdate(e.target)} required />
                    <label htmlFor="image">Upload Image</label>
                    <input required={crudFunction === 'create' ? true : false} type="file" id="image" name="image" onChange={(e) => {
                        handleAddFile(e.target.files);
                    }} />
                    <button className="success" type="submit">Submit</button>
                    <button type="button" onClick={() => {
                        resetForm();
                        tableElement.current.scrollIntoView({ behavior: "smooth" });
                    }}>Cancel</button>
                </form>
            </div>
        </>);
}

export default AdminFighters;