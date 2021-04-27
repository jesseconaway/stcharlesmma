import React from 'react';
import logoBrush from '../assets/SCMMA_logo_brush_grey.svg';
import teamPhoto from '../assets/big_class.jpg';

const Home = () => {

    return (<>
        <div className="backgroundHeader">
            <img src={logoBrush} alt="Saint Charles MMA Logo" />
        </div>
        <div className="container">
            <h1 className="headerTitle">SAINT CHARLES MMA & BRAZILIAN JIU JITSU</h1>
            <img className="landingImg" src={teamPhoto} alt="St. Charles MMA Brazilian Jiu Jitsu Team" />
            <div className="subhead">
                <p>
                    St. Charles MMA is the premier MMA and Brazilian Jiu-Jitsu school in the Midwest.
                    We provide instruction in Brazilian Jiu-Jitsu, Muay Thai, Wrestling, and Boxing.
                    We also offer a wide-range of kids and entry level classes geared towards beginners,
                    high level competitors, and everything in between.
                </p>
            </div>
        </div>
    </>);
}

export default Home;