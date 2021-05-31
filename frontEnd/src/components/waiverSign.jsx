// import React, { useState, useEffect } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
// import axios from 'axios';

// const WaiverSign = () => {

//     const [authCode, setAuthCode] = useState('');
//     const location = useLocation();
//     const history = useHistory();

//     const getAuthCode = () => {
//         location.search === ""
//             ? history.push('/waiver')
//             : setAuthCode(location.search.slice(6));
//     }

//     const getAccessToken = async () => {
//         const res = await axios.post('/api/docusign', { "authCode": authCode });
//         console.log(res.data);
//         window.location.href = res.data;
//     };

//     useEffect(() => {
//         getAuthCode();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
//     return (<>
//         <div className="container">
//             <h1>SIGN THE WAIVER</h1>
//             <button onClick={() => getAccessToken()}>SIGN WAIVER</button>
//         </div>
//     </>);
// }

// export default WaiverSign;

import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const WaiverSign = () => {

    const [signerObject, setSignerObject] = useState({
        authCode: '',
        email: '',
        name: ''
    });
    const location = useLocation();
    const history = useHistory();

    const getAuthCode = () => {
        if (location.search === "") {
            history.push('/waiver')
        } else {
            let signerObjectLocal = { ...signerObject };
            signerObjectLocal.authCode = location.search.slice(6);
            setSignerObject(signerObjectLocal);
        }
    };

    const handleChange = (e) => {
        let signerObjectLocal = { ...signerObject };
        signerObjectLocal[e.target.name] = e.target.value;
        setSignerObject(signerObjectLocal);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/docusign', signerObject);
        console.log(res);
        window.location.href = res.data;
    };

    useEffect(() => {
        getAuthCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<>
        <div className="container">
            <h1>SIGN THE WAIVER</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="email" required onChange={(e) => handleChange(e)} />
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="name" required onChange={(e) => handleChange(e)} />
                <button type="submit">SIGN WAIVER</button>
            </form>
        </div>
    </>);
}

export default WaiverSign;