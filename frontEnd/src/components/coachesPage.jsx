import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoachCard from './coachCard';

const Coaches = () => {
    const [coaches, setCoaches] = useState([]);

    const fetchCoaches = async () => {
        const coachList = await axios.get('/api/coaches');
        setCoaches(coachList.data);
    }

    useEffect(() => {
        fetchCoaches();
    }, [])

    return (<>
        <div className="container">
            <h1>COACHES</h1>
            {coaches.map(coach => {
                return (
                    <div key={coach._id} className="cardContainer">
                        <CoachCard
                            name={coach.name.toUpperCase()}
                            classes={coach.classesCoached}
                            image={coach.image} />
                    </div>
                )
            })}
        </div>
    </>);
}

export default Coaches;