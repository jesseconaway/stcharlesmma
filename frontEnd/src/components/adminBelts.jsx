import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminBelts = () => {
    const [belts, setBelts] = useState([]);
    const [newBelt, setNewBelt] = useState({
        name: '',
        rank: ''
    })
    const [itemToDelete, setItemToDelete] = useState(null);
    const [crudFunction, setCrudFunction] = useState('');

    const formContainer = useRef(null);
    const formElement = useRef(null);
    const listElement = useRef(null);

    const beltRanks = [
        'black',
        'brown',
        'purple',
        'blue',
    ];

    const fetchBelts = async () => {
        const beltList = await axios.get('/api/belts');
        beltList.data.sort((x, y) => {
            if (x.name > y.name) return 1;
            if (x.name < y.name) return -1;
            else return 0;
        });
        setBelts(beltList.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let x of Object.entries(newBelt)) {
            if (x[1] === '') {
                toast.error('Select a value for all fields');
                return;
            }
        }
        const res = await axios.post('/api/belts', newBelt);
        if (res.status === 200) {
            fetchBelts();
            setCrudFunction('');
            resetForm();
            toast.success("New Belt Rank Added");
            listElement.current.scrollIntoView({ behavior: "smooth" });
        } else {
            toast.error('Something Went Wrong');
        }
        setCrudFunction('');

    }

    const handleDelete = async (id) => {
        const res = await axios.delete(`/api/belts/${id}`);
        if (res.status === 200) {
            toast.success('Belt Rank Deleted');
            const newScheduleItems = belts.filter(x => x._id !== id)
            setBelts(newScheduleItems);
        } else {
            toast.error('Something went wrong');
        }
    }

    const handleChange = (e) => {
        let newItemLocal = { ...newBelt };
        newItemLocal[e.target.name] = e.target.value;
        setNewBelt(newItemLocal);
    }

    const resetForm = () => {
        setNewBelt({
            name: '',
            rank: ''
        });
        formElement.current.reset();
        setCrudFunction('');
    }

    useEffect(() => {
        fetchBelts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let formClasses = crudFunction ? "formContainer is-visible" : "formContainer";
    return (
        <>
            <div className={itemToDelete ? 'confirmDelete shown' : 'confirmDelete'}>
                <div>
                    <p>{itemToDelete ? `Are you sure you want to permanently delete ${itemToDelete.name}?` : 'error'}</p>
                    <span>
                        <button onClick={() => {
                            handleDelete(itemToDelete._id);
                            setItemToDelete(null);
                        }}>Yes</button>
                        <button onClick={() => setItemToDelete(null)}>No</button>
                    </span>
                </div>
            </div>
            <h1 ref={listElement}>BELT RANKINGS</h1>
            <ToastContainer />
            <div className="beltRankContainer">
                {beltRanks.map(beltRank => {
                    return (
                        <div key={beltRank}>
                            <img src={`../../images/${beltRank}belt.png`} alt={`${beltRank} belt`} />
                            <h2 className="beltHeader">{beltRank.toUpperCase() + ' BELTS'}</h2>
                            <ul className="adminList">
                                {belts.filter(x => x.rank === beltRank).map(item => {
                                    return (
                                        <li className="adminBeltItem" key={item._id}>
                                            <p>{item.name}</p>
                                            <div className="deleteIcon" onClick={() => setItemToDelete(item)}><div><span></span><span></span></div></div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>)
                }
                )}
            </div>
            <button type="button" onClick={() => {
                resetForm();
                setCrudFunction("create");
                formContainer.current.scrollIntoView({ behavior: "smooth" });
            }}>Add Student</button>
            <div ref={formContainer} className={formClasses}>
                <form ref={formElement} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="rank">Rank</label>
                    <select id="rank" name="rank" defaultValue={"-Select-"} onChange={(e) => handleChange(e)} required>
                        <option disabled value="-Select-">-Select-</option>
                        {beltRanks.map(rank => {
                            return (
                                <option key={rank + '1'} value={rank}>{rank}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" onChange={(e) => handleChange(e)} required />
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

export default AdminBelts;