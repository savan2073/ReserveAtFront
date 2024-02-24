import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Dialog from '@mui/material/Dialog';
import PropTypes from "prop-types";

const containerStyle = {
    width: '100%',
    height: '400px',
};

function BusinessMapDialog({ open, onClose, businesses }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBWiRPMfvXXUEXXcYE4C-xCyYSLUKXy0DI", // Klucz API powinien być przechowywany bezpiecznie
    });

    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false); // Nowy stan kontrolujący widoczność dialogu

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setDialogVisible(true); // Opóźnione otwarcie dialogu
            }, 1000); // Czas opóźnienia w ms

            return () => clearTimeout(timer); // Czyszczenie timera
        } else {
            setDialogVisible(false); // Natychmiastowe zamknięcie dialogu
        }
    }, [open]);

    useEffect(() => {
        if (dialogVisible) {
            const newMarkers = businesses.map(business => (
                <Marker
                    key={business.businessId}
                    position={{ lat: Number(business.latitude), lng: Number(business.longitude) }}
                    onClick={() => setSelectedBusiness(business)}
                />
            ));
            setMarkers(newMarkers);
        }
    }, [dialogVisible, businesses]); // Aktualizacja markerów przy zmianie dialogVisible lub businesses

    const center = businesses[0] ? {
        lat: Number(businesses[0].latitude),
        lng: Number(businesses[0].longitude),
    } : {
        lat: 52.237049, // Przykładowe współrzędne centrum Polski
        lng: 21.017532,
    };

    return (
        <Dialog open={dialogVisible} onClose={() => {setDialogVisible(false); onClose();}} fullWidth maxWidth="lg">
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >
                    {markers}
                    {selectedBusiness && (
                        <InfoWindow
                            position={{ lat: Number(selectedBusiness.latitude), lng: Number(selectedBusiness.longitude) }}
                            onCloseClick={() => setSelectedBusiness(null)}
                        >
                            <div>
                                <h2>{selectedBusiness.businessName}</h2>
                                <p>{selectedBusiness.address}</p>
                                {/* Dodatkowe informacje o biznesie */}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            )}
        </Dialog>
    );
}

BusinessMapDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    businesses: PropTypes.arrayOf(
        PropTypes.shape({
            businessId: PropTypes.number.isRequired,
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            businessName: PropTypes.string,
            address: PropTypes.string,
        })
    ).isRequired,
};

export default BusinessMapDialog;
