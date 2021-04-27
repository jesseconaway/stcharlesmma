import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle as questionMark } from '@fortawesome/free-solid-svg-icons';
import sortItems from './../utils/sort';
import Pagination from './common/pagination';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';

const Admin = () => {
    const [coaches, setCoaches] = useState([]);
    const [coach, setCoach] = useState({
        name: '',
        classesCoached: [],
        image: '',
        file: undefined,
        order: 999
    });
    const [tableInfo, setTableInfo] = useState({
        pageSize: 2,
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

    const formElement = useRef(null);

    const fetchCoaches = async () => {
        const coachList = await axios.get('/api/coaches');
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

    const handleSubmit = async (e, id) => {
        e.preventDefault();

        if (crudFunction === 'create') {
            const formData = new FormData();
            formData.append('imageData', coach.file[0]);
            const fileRes = await axios.post('/api/images', formData);
            const coachRes = await axios.post('/api/coaches', coach);
            console.log(fileRes.data);
            console.log(coachRes.data);
            if (fileRes.data === coachRes.data) {
                alert('New Coach Created');
                const coachList = await axios.get('/api/coaches');
                setCoaches(coachList.data);
                resetForm();
            } else {
                alert('Something went wrong. Make sure image file type is .jpg or .png')
            }
        } if (crudFunction === 'update') {
            if (coach.file) {
                const formData = new FormData();
                formData.append('imageData', coach.file[0]);
                const oldCoachRes = await axios.get(`/api/coaches/${currentItemID}`);
                const fileDeleteRes = await axios.delete(`/api/images/${oldCoachRes.data.image}`);
                const fileRes = await axios.post('/api/images', formData);
                console.log(fileDeleteRes.data);
                console.log(fileRes.data);
            }

            const coachRes = await axios.post(`/api/coaches/${currentItemID}`, coach);
            console.log(coachRes.data);
            if (coachRes.data === "Coach Updated") {
                alert('Coach Updated');
                const coachList = await axios.get('/api/coaches');
                setCoaches(coachList.data);
                resetForm();
            } else {
                alert('Something went wrong. Make sure image file type is .jpg or .png')
            }
        }
        resetForm();
    };

    const handleUpdate = coachToUpdate => {
        setCoach({
            name: coachToUpdate.name,
            classesCoached: coachToUpdate.classesCoached,
            image: coachToUpdate.image,
            order: coachToUpdate.order
        });
        for (let item of coach.classesCoached) {
            handleAddClass(item);
        };
        setCrudFunction('update');
        setCurrentItemID(coachToUpdate._id);
    }

    const handleDelete = async (coach) => {
        console.log(coach);
        const coachRes = await axios.delete(`/api/coaches/${coach._id}`);
        const fileRes = await axios.delete(`/api/images/${coach.image}`);
        console.log(coachRes.data);
        console.log(fileRes.data);
        if (fileRes.data === coachRes.data) {
            alert('Coach Deleted');
            const coachList = await axios.get('/api/coaches');
            setCoaches(coachList.data);
        } else {
            alert('Something went wrong');
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

    const handleFormUpdate = (eventTarget) => {
        let newCoach = { ...coach };
        newCoach[eventTarget.name] = eventTarget.value;
        setCoach(newCoach);
    }

    const sortedData = sortItems(coaches, tableInfo.sortColumn.path, tableInfo.sortColumn.order);

    let paginatedData = sortedData.slice((tableInfo.currentPage - 1) * tableInfo.pageSize, tableInfo.currentPage * tableInfo.pageSize);

    let formClasses = crudFunction ? "formContainer is-visible" : "formContainer";

    useEffect(() => {
        fetchCoaches();
    }, [])

    return (<>
        <div className="container">
            <h1>ADMIN</h1>
            <h2>COACHES</h2>
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
                <button onClick={() => setCrudFunction('create')}>Add Coach</button>
            </div>
            <div className={formClasses}>
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
                        <option value="Wrestling">Wrestling</option>
                        <option value="Jiu-Jitsu">Jiu-Jitsu</option>
                        <option value="Boxing">Boxing</option>
                        <option value="MMA">MMA</option>
                    </select>
                    {coach.classesCoached.length > 0
                        && coach.classesCoached.map(classCoached => {
                            console.log(classCoached);
                            return (
                                <div key={classCoached}>
                                    <p>{classCoached}</p>
                                    <button type="button" onClick={() => {
                                        let newCoach = { ...coach };
                                        newCoach.classesCoached = newCoach.classesCoached.filter(x => x !== classCoached);
                                        setCoach(newCoach);
                                    }}>Remove</button>
                                </div>
                            )
                        })}
                    <label htmlFor="order">Display Order <FontAwesomeIcon className="icon" title='This controls the order in which coaches are displayed. "1" would be at the top of the page. Numbers can be repeated.' icon={questionMark} /></label>
                    <input id="order" type="number" name="order" value={coach.order} onChange={(e) => handleFormUpdate(e.target)} required />
                    <label htmlFor="image">Upload Image</label>
                    <input required={crudFunction === 'create' ? true : false} type="file" id="image" name="image" onChange={(e) => {
                        handleAddFile(e.target.files);
                    }} />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => resetForm()}>Cancel</button>
                </form>
            </div>
        </div>
    </>);
}

export default Admin;