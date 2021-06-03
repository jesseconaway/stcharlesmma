import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoachCard from './coachCard';
import Loading from './common/loading';

const Coaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoaches = async () => {
        setLoading(true);
        const coachList = await axios.get('/api/coaches');
        setCoaches(coachList.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoaches();
    }, [])

    return (<>
        {loading ? <Loading /> :
            <div className="container">
                <h1>COACHES</h1>
                <p>click for details</p>
                <div className="coachCardContainer">
                    {coaches.map(coach => {
                        return (
                            <CoachCard
                                key={coach._id}
                                name={coach.name.toUpperCase()}
                                classes={coach.classesCoached}
                                image={coach.image}
                                bio={coach.bio}
                                accolades={coach.accolades}
                                quote={coach.quote} />
                        )
                    })}
                </div>
            </div>
        }
    </>);
}

export default Coaches;