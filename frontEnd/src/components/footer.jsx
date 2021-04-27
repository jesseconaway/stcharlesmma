import React from 'react';
import { Link } from 'react-router-dom';
import facebookIcon from '../assets/facebook-icon-gray.svg';
import instagramIcon from '../assets/instagram-icon-gray.svg';

const Footer = () => {
    return (
        <div className="footer">
            <div>
                <p>1861 Scherer Pkwy #100<br />Saint Charles, MO 63303</p>
                <Link to="/contact"><button>Contact</button></Link>
                <a href="tel:1-314-443-7371"><button>314-443-7371</button></a>
                <a href="mailto:mannydogpro@aol.com?subject=Inquiry from SCMMA website"><button>Email</button></a>
            </div>
            <div>
                <ul>
                    <li><Link to="/coaches">Coaches</Link></li>
                    <li><Link to="/fighters">Fighters</Link></li>
                    <li><Link to="/schedule">Schedule</Link></li>
                    <li><Link to="/classes">Classes</Link></li>
                    <li><Link to="/beltrankings">Belt Rankings</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li>
                        <a className="social-link" href="https://www.facebook.com/SCMMABJJ"
                        ><img
                                src={facebookIcon}
                                alt="St. Charles MMA Facebook"
                            /></a>
                    </li>
                    <li>
                        <a className="social-link" href="https://www.instagram.com/saintcharlesmma/"
                        ><img
                                src={instagramIcon}
                                alt="St. Charles MMA Instagram"
                            /></a>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><Link to="/admin">Admin Login</Link></li>
                    <li><Link to="/waiver">Sign Waiver</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;