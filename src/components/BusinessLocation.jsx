import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Dialog from "@mui/material/Dialog";

const containerStyle = {
    width: '400px',
    height: '400px'
};

// Centrum Polski
const center = {
    lat: 51.405,
    lng: 19.703
};

function BusinessLocation({ open, onClose, onSave }) {
    const [location, setLocation] = useState(center);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBWiRPMfvXXUEXXcYE4C-xCyYSLUKXy0DI" // Wstaw swój klucz API
    })

    const onMapClick = useCallback((e) => {
        setLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
        // Tutaj możesz dodać logikę do zapisania współrzędnych w stanie komponentu
    }, []);

    const mapMarkup = isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onClick={onMapClick}
        >
            <Marker position={location} />
        </GoogleMap>
    ) : <></>;

    return (
        <Dialog open={open} onClose={onClose}>
            <div>{mapMarkup}</div>
            <button onClick={() => onSave(location)}>Zatwierdź</button>
        </Dialog>
    );
}

export default BusinessLocation;