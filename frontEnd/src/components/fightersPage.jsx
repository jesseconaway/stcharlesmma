import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FighterCard from './fighterCard';
import Loading from './common/loading';

const Fighters = () => {
    const [fighters, setFighters] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchFighters = async () => {
        setLoading(true);
        const fighterList = await axios.get('/api/fighters');
        setFighters(fighterList.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchFighters();
    }, [])

    return (<>
        {loading ? <Loading /> :
            <div className="container">
                <h1>FIGHTERS</h1>
                <div className="flexContainer">
                    {fighters.map(fighter => {
                        return (
                            <FighterCard
                                key={fighter._id}
                                image={fighter.image}
                                name={fighter.name.toUpperCase()}
                                details={fighter.details} />
                        )
                    })}
                </div>
            </div>
        }
    </>);
}

export default Fighters;