import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import facebookIcon from '../assets/facebook-icon-gray.svg';
import instagramIcon from '../assets/instagram-icon-gray.svg';

class Navbar extends Component {
    state = { expanded: false, scrolled: false }

    componentDidMount() {
        window.innerWidth < 992 ? this.setState({ expanded: false }) : this.setState({ expanded: true });

        (window.pageYOffset === 0 && window.innerWidth > 992) ? this.setState({ scrolled: false }) : this.setState({ scrolled: true });

        window.addEventListener('resize', () => {
            if (window.innerWidth < 992) this.setState({ expanded: false });
            (window.pageYOffset === 0 && window.innerWidth > 992) ? this.setState({ scrolled: false }) : this.setState({ scrolled: true });
        })

        window.addEventListener('scroll', () => {
            (window.pageYOffset === 0 && window.innerWidth > 992) ? this.setState({ scrolled: false }) : this.setState({ scrolled: true });
        })
    }
    componentDidUpdate(prevProps) {
        if (window.innerWidth < 992 && this.state.expanded === true && this.props.location !== prevProps.location) {
            this.setState({ expanded: false });
        }
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    expandNav = () => {
        const expanded = this.state.expanded ? false : true;
        this.setState({ expanded });
    }

    render() {
        const ulClass = this.state.expanded ? "active" : "";
        const navToggleClass = this.state.expanded ? "nav-toggle active" : "nav-toggle";
        const navbarClass = this.state.scrolled ? "navbar" : "navbar navbarTransparent";
        const navLinksClass = this.state.scrolled ? "nav-links" : "nav-links nav-linksTransparent";

        return (
            <nav className={navbarClass}>
                <div className="brand"><Link to="index.html">SCMMA</Link></div>
                <span onClick={this.expandNav} className={navToggleClass}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className={navLinksClass}>
                    <ul className={ulClass}>
                        <li><Link to="/#blank">Coaches</Link></li>
                        <li><Link to="/#blank">Fighters</Link></li>
                        <li><Link to="/#blank">Schedule</Link></li>
                        <li><Link to="/#blank">Classes</Link></li>
                        <li><Link to="/#blank">Belt Rankings</Link></li>
                        <li><Link to="/#blank">About</Link></li>
                        <li><Link to="/#blank">Contact</Link></li>
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
            </nav>
        );
    }
}

export default withRouter(Navbar);