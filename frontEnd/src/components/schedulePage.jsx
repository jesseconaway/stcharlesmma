import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HashLink } from 'react-router-hash-link';
import Loading from './common/loading';

const Schedule = () => {
    const [scheduleItems, setScheduleItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
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
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const daysOfTheWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return (<>
        <div className="container">
            <h1>SCHEDULE</h1><p>Click a class for details</p>
            {loading ? <Loading /> :
                <div className="scheduleContainer">
                    {daysOfTheWeek.map(dotw => {
                        return (
                            <div key={dotw}>
                                <h2>{dotw.toUpperCase()}</h2>
                                <ul className="adminList">
                                    {scheduleItems.filter(x => x.day === dotw).map(item => {
                                        return (
                                            <li className="adminScheduleItem" key={item._id}>
                                                <p><HashLink to={`/classes#${item.name.split(' ').join('-')}`}>
                                                    <strong>{item.name}</strong>
                                                </HashLink>{
                                                        ` ${item.time} ${item.meridiem}`
                                                    }</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>)
                    }
                    )}
                </div>
            }
        </div>
    </>);
}

export default Schedule;