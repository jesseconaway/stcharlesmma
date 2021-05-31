import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import Map from './common/map';

const Contact = () => {

    const [contactBody, setContactBody] = useState({
        name: '',
        email: '',
        message: ''
    });

    const reRef = useRef();
    const formElement = useRef();

    const handleChange = (e) => {
        let contactBodyLocal = { ...contactBody };
        contactBodyLocal[e.target.name] = e.target.value;
        setContactBody(contactBodyLocal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tokenRes = await reRef.current.executeAsync();
        tokenRes && reRef.current.reset();

        try {
            const res = await axios.post('/api/contact', {
                ...contactBody,
                token: tokenRes
            });
            console.log(res)
            if (res.status === 200) {
                setContactBody({
                    name: '',
                    email: '',
                    message: ''
                });
                formElement.current.reset();
                toast.success(res.data);
            }
        } catch (error) {
            toast.error(`Something went wrong. Error: ${error.message}`)
        }
    }

    return (<>
        <div className="container">
            <ToastContainer />
            <div className="flexContainer">
                <div>
                    <h1>CONTACT</h1>
                    <form ref={formElement} onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e) => handleChange(e)}
                            required
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your name" />
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => handleChange(e)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Your email" />
                        <label htmlFor="message">Message</label>
                        <textarea
                            onChange={(e) => handleChange(e)}
                            required
                            rows="3"
                            type="text"
                            name="message"
                            id="message"
                            placeholder="Enter your message here" />
                        <button type="submit">Submit</button>
                    </form>
                    <div className="flexContainer">
                        <div className="space-between">
                            <hr />
                            <p>OR</p>
                            <hr />
                        </div>
                    </div>
                    <div className="flexContainer">
                        <a href="tel:1-314-443-7371"><button>314-443-7371</button></a>
                        <a href="mailto:mannydogpro@aol.com?subject=Inquiry from SCMMA website"><button>Email</button></a>
                    </div>
                </div>
                <ReCAPTCHA
                    sitekey='6Lf7kNMaAAAAADclo1-aIj0dJSo6bkwDTMwGaXyf'
                    size="invisible"
                    ref={reRef} />
                <Map />
            </div>
        </div>
    </>);
}

export default Contact;