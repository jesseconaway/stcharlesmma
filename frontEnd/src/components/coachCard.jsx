import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const CoachCard = ({ name, classes, image, bio, accolades, quote }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showScroll, setShowScroll] = useState(false);

    const popupRef = useRef(null);
    const popupContentRef = useRef(null);

    const handleClickOutside = useCallback((e) => {
        if (popupRef && !popupRef.current.contains(e.target)) {
            setShowPopup(false);
            setShowScroll(false);
        }
    }, [setShowPopup]);

    const handleScroll = useCallback(() => {
        setShowScroll(false);
    }, [setShowScroll]);

    useEffect(() => {
        if (showPopup) {
            window.addEventListener("mousedown", handleClickOutside);
            popupRef.current.addEventListener("scroll", handleScroll);
        } else {
            window.removeEventListener("mousedown", handleClickOutside)
            popupRef.current.removeEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("mousedown", handleClickOutside)
    }, [showPopup, handleClickOutside, handleScroll]);

    const handleIsOverflowing = useCallback((e) => {
        if (popupContentRef.current.scrollHeight > popupRef.current.clientHeight - 95) {
            showScroll === false && setShowScroll(true);
        } else if (popupContentRef.current.scrollHeight < popupRef.current.clientHeight - 95) {
            showScroll === true && setShowScroll(false);
        }
    }, [showScroll]);

    useEffect(() => {
        if (showPopup) {
            window.addEventListener("resize", handleIsOverflowing);
        } else {
            window.removeEventListener("resize", handleIsOverflowing)
        }
        return () => window.removeEventListener("resize", handleIsOverflowing)
    }, [showPopup, handleIsOverflowing]);

    useEffect(() => {
        popupRef.current.scrollTop = 0;
        if (showPopup && popupContentRef.current.scrollHeight > popupRef.current.clientHeight - 95) {
            showScroll === false && setShowScroll(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showPopup])

    return (
        <>
            <div className={showPopup ? "infoPopup shown" : "infoPopup"}>
                <div ref={popupRef}>
                    <div ref={popupContentRef}>
                        <h2>{name}</h2>
                        <img src={`../../images/${image}`} alt={'picture of ' + name} />
                        {bio && <p>{bio}</p>}
                        {accolades.length > 0 && <h3>Accolades:</h3>}
                        <ul>
                            {accolades &&
                                accolades.map(accolade => {
                                    return (<li key={accolade}>{accolade}</li>)
                                })}
                        </ul>
                        {quote && <h3>Quote:</h3>}
                        <p>{quote}</p>
                        <button onClick={() => { setShowPopup(false); setShowScroll(false) }}>Close</button>
                    </div>
                    <span className={showScroll ? 'shown' : ''}>
                        <FontAwesomeIcon icon={faChevronDown} size='4x' />
                    </span>
                </div>
            </div>
            <div className="coachCard" title="Click for more info" onClick={() => setShowPopup(true)}>
                <div className="blackDiv"></div>
                <div className="redDiv"></div>
                <div className="coachName">
                    {name.split(' ').map(x => <p key={x}>{x}</p>)}
                </div>
                <div className="coachClasses">
                    {classes.map(x => <p key={x}>{x}</p>)}
                </div>
                <div className="coachImg">
                    <img src={`../../images/${image}`} alt={'picture of ' + name} />
                </div>
            </div>
        </>
    );
}

export default CoachCard;