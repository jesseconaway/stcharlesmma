import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt as mapPin } from '@fortawesome/free-solid-svg-icons';

const LocationPin = ({ text }) => {
    return (<div className="pin">
        <FontAwesomeIcon icon={mapPin} title="St. Charles MMA 1861 Scherer Pkwy #100, Saint Charles MO 63303" className="icon pin-icon" />
    </div>);
}

export default LocationPin;