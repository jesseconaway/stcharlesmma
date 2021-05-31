import React from 'react';
import scmmaTenYear from '../assets/scmma10year_splash1.png';

const About = () => {
    return (<>
        <div className="aboutContainer">
            <div className="homeFlexContainer">
                <div className="infoContainer">
                    <h1>ABOUT SCMMA</h1>
                    <p>
                        At St. Charles MMA our goal is simply to make you a better person. You will learn self defense, get in the best shape of your life, and grow from our motivating and positive staff and students. Our students range from the mom that wants to be more fit and the student who is looking to build confidence, to the professional athlete looking to push themselves to their ultimate potential. All are welcome.
                    </p>
                </div>
                <img src={scmmaTenYear} alt="Saint Charles MMA ten years from 2007 to 2017" />
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

export default About;