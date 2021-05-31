import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const userLocal = { ...user };
        userLocal[e.target.name] = e.target.value;
        setUser(userLocal);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginRes = await axios.post('/api/adminLogin', user);
            toast.success(loginRes.data.message);
            localStorage.setItem('userInfo', JSON.stringify(loginRes.data));
            history.push('/admin');
            // const jwtDecoded = jwt.verify(loginRes.data.token, '0sn3is78bes8sf3azxuckuyjhrf');
            // console.log(jwtDecoded);
        } catch (error) {
            toast.error("Incorrect Username or Password");
        }
    }

    const checkToken = async () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo.token) return;

        const tokenRes = await axios.post('/api/adminLogin/verify', userInfo);
        if (tokenRes.status === 400) {
            toast.error(tokenRes.data.message);
        } else if (tokenRes.status === 200) {
            history.push('/admin')
        }
    }

    useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <ToastContainer />
            <h1>Admin Login</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="username">Username</label>
                <input onChange={(e) => handleChange(e)} id="username" name="username" type="text" required></input>
                <label htmlFor="password">Password</label>
                <input onChange={(e) => handleChange(e)} id="password" name="password" type="password" required></input>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default AdminLogin;