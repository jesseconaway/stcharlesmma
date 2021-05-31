import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {

    const [activeSlide, setActiveSlide] = useState(0);

    const slides = [
        {
            title: "WELCOME TO SCMMA",
            text: "The premier MMA and Brazilian Jiu-Jitsu school in the Midwest",
            link: "/classes",
            buttonText: "View Classes"
        },
        {
            title: "CLASSES FOR ANY SCHEDULE",
            text: "Classes run early morning to late evening",
            link: "/schedule",
            buttonText: "View Schedule"
        },
        {
            title: "MEET THE COACHES",
            text: "Learn from professionals who have competed at the highest levels",
            link: "/coaches",
            buttonText: "View Coaches"
        }
    ];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            activeSlide === slides.length - 1
                ? setActiveSlide(0)
                : setActiveSlide(activeSlide + 1)
        }, 6000);
        return () => clearInterval(slideInterval);
    }, [activeSlide, slides.length])

    return (
        <div className="carouselContainer">
            {slides.map(slide => {
                return (
                    <div className={
                        activeSlide === slides.indexOf(slide)
                            ? "carouselItemActive"
                            : "carouselItemInactive"}
                        key={slide.title}
                    >
                        <h1>{slide.title}</h1>
                        <p>{slide.text}</p>
                        <button><Link to={slide.link}>{slide.buttonText}</Link></button>
                    </div>
                )
            })}
            <div className="pillBox">
                {slides.map(slide => {
                    return (
                        <div className={
                            activeSlide === slides.indexOf(slide)
                                ? "pill activePill"
                                : "pill"}
                            key={slide.title}
                            onClick={() => setActiveSlide(slides.indexOf(slide))}
                        ></div>
                    )
                })}
            </div>
        </div>
    );
}

export default Carousel;