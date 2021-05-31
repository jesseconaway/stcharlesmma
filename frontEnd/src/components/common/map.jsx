import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './locationPin';

const Map = () => {

    const location = {
        address: 'St. Charles MMA',
        lat: 38.762331,
        lng: -90.525377,
    };

    return (
        <div className="google-map">
            <h2>1861 Scherer Pkwy #100, Saint Charles MO 63303</h2>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBMoiOZDSqFmVT1Q7MeQ-RQutjjql3yljw' }}
                defaultCenter={location}
                defaultZoom={14}
            >
                <LocationPin
                    lat={location.lat}
                    lng={location.lng}
                    text={location.address}
                />
            </GoogleMapReact>
        </div>
    )
}

export default Map;