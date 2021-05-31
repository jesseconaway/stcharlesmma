import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './common/loading';

const BeltRankings = () => {
    const [belts, setBelts] = useState([]);
    const [loading, setLoading] = useState(false);

    const beltRanks = [
        'black',
        'brown',
        'purple',
        'blue',
    ];

    const fetchBelts = async () => {
        setLoading(true);
        const beltList = await axios.get('/api/belts');
        beltList.data.sort((x, y) => {
            if (x.name > y.name) return 1;
            if (x.name < y.name) return -1;
            else return 0;
        });
        setBelts(beltList.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchBelts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<>
        {loading ? <Loading /> :
            <div className="container">
                <h1>BELT RANKINGS</h1>
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
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>)
                    }
                    )}
                </div>
            </div>}
    </>);
}

export default BeltRankings;