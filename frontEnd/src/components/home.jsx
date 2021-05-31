import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoBrush from '../assets/SCMMA_logo_brush_grey.svg';
import teamPhoto from '../assets/big_class.jpg';
import Carousel from './common/carousel';
import Card from './common/card';

const Home = () => {

    const [classes, setClasses] = useState([]);

    const cards = [
        {
            headline: 'CLASSES',
            body: `We currently offer ${classes.length + 1} unique classes, ranging from beginner to expert level.`,
            link: '/classes',
            buttonText: 'View Classes'
        },
        {
            headline: 'LIVE SCHEDULE',
            body: 'Classes at SCMMA run from early morning to late evening, with classes 7 days a week.',
            link: '/schedule',
            buttonText: 'See Schedule'
        },
        {
            headline: 'COACHES',
            body: 'Our coaching staff includes world class competitors in Jiu-Jitsu as well as MMA.',
            link: '/coaches',
            buttonText: 'Go To Coaches'
        }
    ]

    const fetchData = async () => {
        const res = await axios.get('/api/classes');
        setClasses(res.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (<>
        <div className="backgroundHeader">
            <img src={logoBrush} alt="Saint Charles MMA Logo" />
        </div>
        <div className="landingImgContainer">
            <Carousel />
            <img className="landingImg" src={teamPhoto} alt="St. Charles MMA Brazilian Jiu Jitsu Team" />
        </div>
        <div className="homeContainer">
            <h1 className="headerTitle">SAINT CHARLES MMA & BRAZILIAN JIU JITSU</h1>
            <div className="subhead">
                <p>
                    St. Charles MMA is the premier MMA and Brazilian Jiu-Jitsu school in the Midwest.
                    We provide instruction in Brazilian Jiu-Jitsu, Muay Thai, Wrestling, and Boxing.
                    We also offer a wide-range of kids and entry level classes geared towards beginners,
                    high level competitors, and everything in between.
                </p>
            </div>
            <hr />
            <div className="cardContainer">
                {cards.map(card => {
                    return (
                        <Card
                            key={card.headline}
                            headline={card.headline}
                            body={card.body}
                            link={card.link}
                            buttonText={card.buttonText}
                        />
                    )
                })}
            </div>
            <hr />
            <div className="homeFlexContainer">
                <div className="videoPlayer">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/pEkd4UIBt_8?start=9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <div>
                    <p className="mainContentParagraph">
                        Team Vaghi, in St. Louis since 1997, is a pioneer for bringing Gracie Jiu-Jitsu to The Midwest. <strong>Rodrigo Vaghi is the highest ranking Gracie Jiu-Jitsu black belt in Missouri</strong>, and Team Vaghi - St. Charles MMA ranks among the best MMA and Jiu-Jitsu gyms in the country, with <strong>World <i>and</i> Pan-American champions</strong>. We are the only team in the area who has produced fighters in the <strong>UFC, Strikeforce, and Bellator</strong>. Come be part of our family for competition, fitness, or fun. <strong>We don't sell belts. We help you earn them because we believe in you</strong>.
                    </p>
                </div>
            </div>
        </div>
    </>);
}

export default Home;