import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminClasses = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({
        name: '',
        description: ''
    })
    const [itemToDelete, setItemToDelete] = useState(null);
    const [crudFunction, setCrudFunction] = useState('');
    const [currentItemID, setCurrentItemID] = useState('');

    const formContainer = useRef(null);
    const listElement = useRef(null);

    const fetchClasses = async () => {
        const classList = await axios.get('/api/classes');
        setClasses(
            classList.data.sort((x, y) => {
                if (x.name > y.name) return 1;
                if (x.name < y.name) return -1;
                else return 0;
            }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (crudFunction === 'create') {
            const res = await axios.post('/api/classes', newClass);
            if (res.status === 200) {
                fetchClasses();
                setCrudFunction('');
                resetForm();
                toast.success("New Class Added");
                listElement.current.scrollIntoView({ behavior: "smooth" });
            } else {
                toast.error('Something Went Wrong');
            }
        }
        if (crudFunction === 'update') {
            const res = await axios.post(`/api/classes/${currentItemID}`, newClass);
            if (res.status === 200) {
                fetchClasses();
                setCurrentItemID('');
                setCrudFunction('');
                resetForm();
                toast.success("Class Updated");
                listElement.current.scrollIntoView({ behavior: "smooth" });
            } else {
                toast.error('Something Went Wrong');
            }
        }

    }

    const handleDelete = async (id) => {
        const res = await axios.delete(`/api/classes/${id}`);
        if (res.status === 200) {
            toast.success('Class Deleted');
            const newClasses = classes.filter(x => x._id !== id)
            setClasses(newClasses);
        } else {
            toast.error('Something went wrong');
        }
    }

    const handleUpdate = classToUpdate => {
        setNewClass({
            name: classToUpdate.name,
            description: classToUpdate.description,
        });
        setCrudFunction('update');
        setCurrentItemID(classToUpdate._id);
        formContainer.current.scrollIntoView({ behavior: "smooth" });
    }

    const handleChange = (e) => {
        let newClassLocal = { ...newClass };
        newClassLocal[e.target.name] = e.target.value;
        setNewClass(newClassLocal);
    }

    const resetForm = () => {
        setNewClass({
            name: '',
            description: ''
        });
        setCrudFunction('');
        setCurrentItemID('');
    }

    useEffect(() => {
        fetchClasses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let formClasses = crudFunction ? "formContainer is-visible" : "formContainer";
    return (
        <>
            <div className={itemToDelete ? 'confirmDelete shown' : 'confirmDelete'}>
                <div>
                    <p>{`Are you sure you want to permanently delete ${itemToDelete ? itemToDelete.name : ''}?`}</p>
                    <span>
                        <button onClick={() => {
                            handleDelete(itemToDelete._id);
                            setItemToDelete(null);
                        }}>Yes</button>
                        <button onClick={() => setItemToDelete(null)}>No</button>
                    </span>
                </div>
            </div>
            <h1 ref={listElement}>CLASSES</h1><p>Click an item to see details or update</p>
            <ToastContainer />
            <ul className="adminList">
                {classes.map(item => {
                    return (
                        <li className="adminListItem" key={item._id}>
                            <p className="updateLink" onClick={() => handleUpdate(item)}>{item.name}</p>
                            <div className="deleteIcon" onClick={() => setItemToDelete(item)}><div><span></span><span></span></div></div>
                        </li>
                    )
                })}
            </ul>
            <button type="button" onClick={() => {
                resetForm();
                setCrudFunction("create");
                formContainer.current.scrollIntoView({ behavior: "smooth" });
            }}>New Class</button>
            <div ref={formContainer} className={formClasses}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="name">Class Name</label>
                    <input type="input" id="name" name="name" value={newClass.name} onChange={(e) => handleChange(e)} required />
                    <label htmlFor="description">Class Description</label>
                    <textarea type="input" id="description" name="description" value={newClass.description} onChange={(e) => handleChange(e)} required />
                    <button className="success" type="submit">Submit</button>
                    <button type="button" onClick={() => {
                        resetForm();
                        setCrudFunction('');
                        listElement.current.scrollIntoView({ behavior: "smooth" });
                    }}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default AdminClasses;