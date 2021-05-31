import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSchedule = () => {
    const [classes, setClasses] = useState([]);
    const [scheduleItems, setScheduleItems] = useState([]);
    const [newScheduleItem, setNewScheduleItem] = useState({
        day: '',
        name: '',
        time: '',
        meridiem: '',
    })
    const [itemToDelete, setItemToDelete] = useState(null);
    const [crudFunction, setCrudFunction] = useState('');

    const formContainer = useRef(null);
    const formElement = useRef(null);
    const listElement = useRef(null);

    const daysOfTheWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const fetchClasses = async () => {
        const classList = await axios.get('/api/classes');
        setClasses(
            classList.data.sort((x, y) => {
                if (x.name > y.name) return 1;
                if (x.name < y.name) return -1;
                else return 0;
            })
        );
    }

    const fetchScheduleItems = async () => {
        const scheduleList = await axios.get('/api/schedule');
        scheduleList.data.sort((x, y) => {
            if (x.time > y.time) return 1;
            if (x.time < y.time) return -1;
            else return 0;
        });
        scheduleList.data.sort((x, y) => {
            if (x.meridiem > y.meridiem) return 1;
            if (x.meridiem < y.meridiem) return -1;
            else return 0;
        });
        for (let x of scheduleList.data) {
            let timeString = x.time.toString(10);
            x.time = timeString.slice(0, -2).concat(':', timeString.slice(-2));
        };
        setScheduleItems(scheduleList.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let x of Object.entries(newScheduleItem)) {
            if (x[1] === '') {
                toast.error('Select a value for all fields');
                return;
            }
        }
        const res = await axios.post('/api/schedule', newScheduleItem);
        if (res.status === 200) {
            fetchScheduleItems();
            setCrudFunction('');
            resetForm();
            toast.success("New Class Added");
            listElement.current.scrollIntoView({ behavior: "smooth" });
        } else {
            toast.error('Something Went Wrong');
        }
        setCrudFunction('');

    }

    const handleDelete = async (id) => {
        const res = await axios.delete(`/api/schedule/${id}`);
        if (res.status === 200) {
            toast.success('Class Deleted');
            const newScheduleItems = scheduleItems.filter(x => x._id !== id)
            setScheduleItems(newScheduleItems);
        } else {
            toast.error('Something went wrong');
        }
    }

    const handleChange = (e) => {
        let newItemLocal = { ...newScheduleItem };
        newItemLocal[e.target.name] = e.target.value;
        setNewScheduleItem(newItemLocal);
    }

    const resetForm = () => {
        setNewScheduleItem({
            day: '',
            name: '',
            time: '',
            meridiem: '',
        });
        formElement.current.reset();
        setCrudFunction('');
    }

    useEffect(() => {
        fetchClasses();
        fetchScheduleItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let formClasses = crudFunction ? "formContainer is-visible" : "formContainer";
    return (
        <>
            <div className={itemToDelete ? 'confirmDelete shown' : 'confirmDelete'}>
                <div>
                    <p>{itemToDelete ? `Are you sure you want to permanently delete ${itemToDelete.name} at ${itemToDelete.time} ${itemToDelete.meridiem} on ${itemToDelete.day}s?` : 'error'}</p>
                    <span>
                        <button onClick={() => {
                            handleDelete(itemToDelete._id);
                            setItemToDelete(null);
                        }}>Yes</button>
                        <button onClick={() => setItemToDelete(null)}>No</button>
                    </span>
                </div>
            </div>
            <h1 ref={listElement}>SCHEDULE</h1>
            <ToastContainer />
            <div className="scheduleContainer">
                {daysOfTheWeek.map(dotw => {
                    return (
                        <div key={dotw}>
                            <h2>{dotw.toUpperCase()}</h2>
                            <ul className="adminList">
                                {scheduleItems.filter(x => x.day === dotw).map(item => {
                                    return (
                                        <li className="adminScheduleItem" key={item._id}>
                                            <p><strong>{item.name}</strong>{
                                                ` ${item.time} ${item.meridiem}`
                                            }</p>
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
            }}>New Class</button>
            <div ref={formContainer} className={formClasses}>
                <form ref={formElement} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="day">Day</label>
                    <select id="day" name="day" defaultValue={"-Select-"} onChange={(e) => handleChange(e)} required>
                        <option disabled value="-Select-">-Select-</option>
                        {daysOfTheWeek.map(day => {
                            return (
                                <option key={day + '1'} value={day}>{day}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="name">Class Name</label>
                    <select id="name" name="name" defaultValue={"-Select-"} onChange={(e) => handleChange(e)} required>
                        <option disabled value="-Select-">-Select-</option>
                        {
                            classes.map(x => {
                                return (
                                    <option key={x._id} value={x.name}>{x.name}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="time">Time</label>
                    <select id="time" name="time" defaultValue="-Select-" onChange={(e) => handleChange(e)} required>
                        <option disabled value="-Select-">-Select-</option>
                        <option value={100}>1:00</option>
                        <option value={115}>1:15</option>
                        <option value={130}>1:30</option>
                        <option value={145}>1:45</option>
                        <option value={200}>2:00</option>
                        <option value={215}>2:15</option>
                        <option value={230}>2:30</option>
                        <option value={245}>2:45</option>
                        <option value={300}>3:00</option>
                        <option value={315}>3:15</option>
                        <option value={330}>3:30</option>
                        <option value={345}>3:45</option>
                        <option value={400}>4:00</option>
                        <option value={415}>4:15</option>
                        <option value={430}>4:30</option>
                        <option value={445}>4:45</option>
                        <option value={500}>5:00</option>
                        <option value={515}>5:15</option>
                        <option value={530}>5:30</option>
                        <option value={545}>5:45</option>
                        <option value={600}>6:00</option>
                        <option value={615}>6:15</option>
                        <option value={630}>6:30</option>
                        <option value={645}>6:45</option>
                        <option value={700}>7:00</option>
                        <option value={715}>7:15</option>
                        <option value={730}>7:30</option>
                        <option value={745}>7:45</option>
                        <option value={800}>8:00</option>
                        <option value={815}>8:15</option>
                        <option value={830}>8:30</option>
                        <option value={845}>8:45</option>
                        <option value={900}>9:00</option>
                        <option value={915}>9:15</option>
                        <option value={930}>9:30</option>
                        <option value={945}>9:45</option>
                        <option value={1000}>10:00</option>
                        <option value={1015}>10:15</option>
                        <option value={1030}>10:30</option>
                        <option value={1045}>10:45</option>
                        <option value={1100}>11:00</option>
                        <option value={1115}>11:15</option>
                        <option value={1130}>11:30</option>
                        <option value={1145}>11:45</option>
                        <option value={1200}>12:00</option>
                        <option value={1215}>12:15</option>
                        <option value={1230}>12:30</option>
                        <option value={1245}>12:45</option>
                    </select>
                    <label htmlFor="meridiem">AM / PM</label>
                    <select id="meridiem" name="meridiem" defaultValue="-Select-" onChange={(e) => handleChange(e)} required>
                        <option disabled value="-Select-">-Select-</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
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

export default AdminSchedule;