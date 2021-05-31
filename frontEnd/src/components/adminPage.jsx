import React, { useEffect } from 'react';
import { Switch, Route, NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminCoaches from './adminCoaches';
import AdminFighters from './adminFighters';
import AdminClasses from './adminClasses';
import AdminSchedule from './adminSchedule';
import AdminBelts from './adminBelts';

const Admin = () => {
    const history = useHistory();

    const checkToken = async () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo.token) {
            history.push('/adminLogin');
        };

        const tokenRes = await axios.post('/api/adminLogin/verify', userInfo);
        tokenRes.status === 200 && toast.success(tokenRes.data.message);
    };

    const handleLogOut = () => {
        localStorage.removeItem('userInfo');
        history.push('/adminLogin');
    }

    useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <ToastContainer />
            <ul className='secondaryNav'>
                <li><NavLink to='/admin/adminBeltRankings'>Belt Ranks</NavLink></li>
                <li><NavLink to='/admin/adminClasses'>Classes</NavLink></li>
                <li><NavLink to='/admin/adminCoaches'>Coaches</NavLink></li>
                <li><NavLink to='/admin/adminFighters'>Fighters</NavLink></li>
                <li><NavLink to='/admin/adminSchedule'>Schedule</NavLink></li>
                <li onClick={() => handleLogOut()}><NavLink to='#nowhere'>Log Out</NavLink></li>
            </ul>
            <Switch>
                <Route path='/admin/adminBeltRankings' component={AdminBelts} />
                <Route path='/admin/adminClasses' component={AdminClasses} />
                <Route path='/admin/adminCoaches' component={AdminCoaches} />
                <Route path='/admin/adminFighters' component={AdminFighters} />
                <Route path='/admin/adminSchedule' component={AdminSchedule} />
                <Route exact path="/admin">
                    <Redirect to="/admin/adminBeltRankings" />
                </Route>
            </Switch>
        </div>
    );
}

export default Admin;