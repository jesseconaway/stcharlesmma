import React from 'react';

const FighterCard = ({ name, details, image }) => {

    return (
        <div className="fighterCard">
            <div className="fighterImg">
                <img src={`../../images/${image}`} alt={'picture of ' + name} />
            </div>
            <div className="fighterName">
                <p>{name}</p>
            </div>
            <div className="fighterDetails">
                {details.map(x => <p key={x}>{x}</p>)}
            </div>
        </div>
    );
}

export default FighterCard;