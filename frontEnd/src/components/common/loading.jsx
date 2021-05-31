import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
    return (
        <div className="loadingBox">
            <p>Loading... </p>
            <FontAwesomeIcon className="spinner" icon={faSpinner} />
        </div>
    );
}

export default Loading;