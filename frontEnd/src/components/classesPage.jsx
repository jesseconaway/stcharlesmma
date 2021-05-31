import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './common/loading';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const res = await axios.get('/api/classes');
        res.data.sort((x, y) => {
            if (x.name > y.name) return 1;
            if (x.name < y.name) return -1;
            else return 0;
        });
        setClasses(res.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (<>
        {loading ? <Loading /> :
            <div className="container">
                <h1>CLASSES</h1>
                <div className="classContainer">
                    {classes.map(item => {
                        return (
                            <div className="classItem" key={item._id}>
                                <div id={item.name.split(' ').join('-')} className="hook"></div>
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        }
    </>);
}

export default Classes;