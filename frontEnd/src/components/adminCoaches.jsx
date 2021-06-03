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

const AdminCoaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [coach, setCoach] = useState({
        name: '',
        classesCoached: [],
        image: '',
        file: undefined,
        bio: '',
        accolades: [],
        quote: '',
        order: 999
    });
    const [classes, setClasses] = useState([]);
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
        { label: 'Classes Coached', path: 'classesCoached' },
        { label: 'Display Order', path: 'order' },
        { label: 'Image', path: 'image' },
        { label: '', key: 1 },
    ]

    const formContainer = useRef(null);
    const formElement = useRef(null);
    const tableElement = useRef(null);
    const accoladesInput = useRef(null);

    const fetchData = async () => {
        const coachList = await axios.get('/api/coaches');
        const classRes = await axios.get('/api/classes');
        let classList = [];
        for (let item of classRes.data) {
            classList.push(item.name);
        };
        setClasses(classList);
        setCoaches(coachList.data);
    }

    const resetForm = () => {
        setCoach(
            {
                name: '',
                classesCoached: [],
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
        if (coach.classesCoached.length === 0) {
            toast.error('Classes coached cannot be empty');
            return;
        }

        if (crudFunction === 'create') {
            const formData = new FormData();
            formData.append('imageData', coach.file[0]);
            const fileRes = await axios.post('/api/images', formData);
            const coachRes = await axios.post('/api/coaches', coach);
            if (fileRes.data === coachRes.data) {
                toast.success('New Coach Created');
                const coachList = await axios.get('/api/coaches');
                setCoaches(coachList.data);
                resetForm();
                tableElement.current.scrollIntoView({ behavior: "smooth" });
            } else {
                toast.error('Something went wrong. Make sure image file type is .jpg or .png')
            }
        } if (crudFunction === 'update') {
            if (coach.file) {
                const formData = new FormData();
                formData.append('imageData', coach.file[0]);
                const oldCoachRes = await axios.get(`/api/coaches/${currentItemID}`);
                const fileDeleteRes = await axios.delete(`/api/images/${oldCoachRes.data.image}`);
                const fileRes = await axios.post('/api/images', formData);
                console.log(fileDeleteRes);
                console.log(fileRes);
            }

            const coachRes = await axios.post(`/api/coaches/${currentItemID}`, coach);
            if (coachRes.status === 200) {
                toast.success('Coach Updated');
                const coachList = await axios.get('/api/coaches');
                setCoaches(coachList.data);
                resetForm();
                tableElement.current.scrollIntoView({ behavior: "smooth" });
            } else {
                toast.error('Something went wrong. Make sure image file type is .jpg or .png')
            }
        }
    };

    const handleUpdate = coachToUpdate => {
        setCoach({
            name: coachToUpdate.name,
            classesCoached: coachToUpdate.classesCoached,
            image: coachToUpdate.image,
            order: coachToUpdate.order,
            bio: coachToUpdate.bio,
            accolades: coachToUpdate.accolades,
            quote: coachToUpdate.quote
        });
        for (let item of coach.classesCoached) {
            handleAddClass(item);
        };
        setCrudFunction('update');
        setCurrentItemID(coachToUpdate._id);
        formContainer.current.scrollIntoView({ behavior: "smooth" });
    }

    const handleDelete = async (coach) => {
        const coachRes = await axios.delete(`/api/coaches/${coach._id}`);
        const fileRes = await axios.delete(`/api/images/${coach.image}`);
        if (fileRes.data === coachRes.data) {
            toast.success('Coach Deleted');
            const coachList = await axios.get('/api/coaches');
            setCoaches(coachList.data);
        } else {
            toast.error('Something went wrong');
        }
    };

    const handleAddFile = (file) => {
        let newCoach = { ...coach };
        newCoach.file = file;
        newCoach.image = file[0].name;
        setCoach(newCoach);
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

    const handleAddClass = (classToAdd) => {
        if (coach.classesCoached.includes(classToAdd)) return;
        let newCoach = { ...coach };
        newCoach.classesCoached = [...coach.classesCoached, classToAdd];
        setCoach(newCoach);
    };

    const handleAddAccolade = (accoladeToAdd) => {
        let newCoach = { ...coach };
        newCoach.accolades = [...coach.accolades, accoladeToAdd];
        setCoach(newCoach);
    };

    const handleFormUpdate = (eventTarget) => {
        let newCoach = { ...coach };
        newCoach[eventTarget.name] = eventTarget.value;
        setCoach(newCoach);
    }

    const sortedData = sortItems(coaches, tableInfo.sortColumn.path, tableInfo.sortColumn.order);

    let paginatedData = sortedData.slice((tableInfo.currentPage - 1) * tableInfo.pageSize, tableInfo.currentPage * tableInfo.pageSize);

    let formClasses = crudFunction ? "formContainer is-visible" : "formContainer";

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <h1 ref={tableElement}>COACHES</h1>
            <p>Click a coach's name to update</p>
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
                    itemCount={coaches.length}
                />
                <button onClick={() => {
                    resetForm();
                    setCrudFunction('create');
                    formContainer.current.scrollIntoView({ behavior: "smooth" });
                }}>New Coach</button>
            </div>
            <div ref={formContainer} className={formClasses}>
                <form ref={formElement} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" value={coach.name} onChange={(e) => {
                        let newCoach = { ...coach };
                        newCoach.name = e.target.value;
                        setCoach(newCoach);
                    }} required />
                    <label htmlFor="classesCoached">Classes Coached</label>
                    <select id="classesCoached" defaultValue={'-Select-'} name="classesCoached" onChange={(e) => {
                        handleAddClass(e.target.value);
                        e.target.value = '-Select-';
                    }} required>
                        <option value="-Select-" disabled>-Select-</option>
                        {classes.map(item => {
                            return (
                                <option key={item} value={item}>{item}</option>
                            )
                        })}
                    </select>
                    <ul>
                        {coach.classesCoached.length > 0
                            && coach.classesCoached.map(classCoached => {
                                console.log(classCoached);
                                return (
                                    <li className="fighterListItem" key={classCoached}>
                                        <p>{classCoached}</p>
                                        <div className="deleteIcon" onClick={() => {
                                            let newCoach = { ...coach };
                                            newCoach.classesCoached = newCoach.classesCoached.filter(x => x !== classCoached);
                                            setCoach(newCoach);
                                        }}><div><span></span><span></span></div>
                                        </div>
                                    </li>
                                )
                            })}
                    </ul>
                    <label htmlFor="order">Display Order <FontAwesomeIcon className="icon" title='This controls the order in which coaches are displayed. "1" would be at the top of the page. Numbers can be repeated.' icon={questionMark} /></label>
                    <input id="order" type="number" name="order" value={coach.order} onChange={(e) => handleFormUpdate(e.target)} required />

                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" type="text" name="bio" value={coach.bio ? coach.bio : ''} onChange={(e) => handleFormUpdate(e.target)} />

                    <label htmlFor="details">Accolades <FontAwesomeIcon className="icon" title='Enter information like "Fighters Coached", "Awards Won", "Personal Achievements", etc.. Enter each piece of information as a separate item.' icon={questionMark} /></label>
                    <input ref={accoladesInput} id="details" name="details" />
                    <button className="success" type="button" onClick={() => {
                        if (accoladesInput.current.value === "") {
                            toast.error('Please enter a value');
                            return;
                        }
                        handleAddAccolade(accoladesInput.current.value);
                        accoladesInput.current.value = '';
                    }}>Add</button>
                    <ul>
                        {coach.accolades && coach.accolades.length > 0
                            && coach.accolades.map(detail => {
                                return (
                                    <li className="fighterListItem" key={detail}>
                                        <p>{detail}</p>
                                        <div className="deleteIcon" onClick={() => {
                                            let newCoach = { ...coach };
                                            newCoach.accolades = newCoach.accolades.filter(x => x !== detail);
                                            setCoach(newCoach);
                                        }}><div><span></span><span></span></div>
                                        </div>
                                    </li>
                                )
                            })}
                    </ul>

                    <label htmlFor="quote">Quote</label>
                    <input id="quote" type="text" name="quote" value={coach.quote ? coach.quote : ''} onChange={(e) => handleFormUpdate(e.target)} />

                    <label htmlFor="image">Upload Image</label>
                    <input required={crudFunction === 'create' ? true : false} type="file" id="image" name="image" onChange={(e) => {
                        handleAddFile(e.target.files);
                    }} />
                    <button className="success" type="submit">Submit</button>
                    <button type="button" onClick={() => {
                        tableElement.current.scrollIntoView({ behavior: "smooth" });
                        resetForm();
                    }}>Cancel</button>
                </form>
            </div>
        </>);
}

export default AdminCoaches;