import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ headline, body, link, buttonText }) => {
    return (
        <div className="card">
            <Link to={link}>
                <h2>{headline}</h2>
                <p>{body}</p>
                <button>{buttonText}</button>
            </Link>
        </div>
    );
}

export default Card;
