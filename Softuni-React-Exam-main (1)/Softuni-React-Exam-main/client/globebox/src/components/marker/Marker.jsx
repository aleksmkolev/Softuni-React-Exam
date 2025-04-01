import { Marker, useMapEvents, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import markerService from '../../services/markerService';
import MarkerForm from './MarkerForm';

export default function MarkerComponent({ onMarkerAdd }) {
    const [tempMarker, setTempMarker] = useState(null);
    const { accessToken } = useContext(UserContext);

    const defaultIcon = new Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    useMapEvents({
        click: (e) => {
            if (!accessToken) return;
            setTempMarker({
                position: e.latlng,
                popup: true
            });
        },
    });

    const handleSaveMarker = async (formData) => {
        if (tempMarker && accessToken) {
            try {
                const markerData = {
                    ...formData,
                    lat: tempMarker.position.lat,
                    lng: tempMarker.position.lng,
                };
                const savedMarker = await markerService.create(markerData, accessToken);
                onMarkerAdd(savedMarker);
                setTempMarker(null);
            } catch (error) {
                console.error('Failed to save marker:', error);
            }
        }
    };

    const handleCancelMarker = () => {
        setTempMarker(null);
    };

    if (!accessToken) {
        return null;
    }

    return (
        <>
            {tempMarker && (
                <Marker position={tempMarker.position} icon={defaultIcon}>
                    <Popup closeButton={false}>
                        <MarkerForm 
                            onSave={handleSaveMarker}
                            onCancel={handleCancelMarker}
                        />
                    </Popup>
                </Marker>
            )}
        </>
    );
}
