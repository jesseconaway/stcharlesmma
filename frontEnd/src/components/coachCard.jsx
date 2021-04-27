import React from 'react';

const CoachCard = ({ name, classes, image }) => {

    return (
        <div className="coachCard">
            <div className="blackDiv"></div>
            <div className="redDiv"></div>
            <div className="coachName">
                {name.split(' ').map(x => <p key={x}>{x}</p>)}
            </div>
            <div className="coachClasses">
                {classes.map(x => <p key={x}>{x}</p>)}
            </div>
            <div className="coachImg">
                <img src={`../../coachImages/${image}`} alt={'picture of ' + name} />
            </div>
        </div>
    );
}

export default CoachCard;