import { Marker, useMapEvents, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import markerService from '../../services/markerService';
import MarkerForm from './MarkerForm';

export default function MarkerComponent({ onMarkerAdd }) {
    const [showForm, setShowForm] = useState(false);
    const [position, setPosition] = useState(null);
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
        click(e) {
            if (!accessToken) return;
            setPosition(e.latlng);
            setShowForm(true);
        }
    });

    const handleClose = () => {
        setShowForm(false);
        setPosition(null);
    };

    const handleSaveMarker = async (formData) => {
        if (position && accessToken) {
            try {
                const markerData = {
                    ...formData,
                    lat: position.lat,
                    lng: position.lng,
                };
                const savedMarker = await markerService.create(markerData, accessToken);
                onMarkerAdd(savedMarker);
                handleClose();
            } catch (error) {
                console.error('Failed to save marker:', error);
            }
        }
    };

    if (!accessToken) {
        return null;
    }

    return showForm && position ? (
        <Marker position={position} icon={defaultIcon}>
            <Popup closeButton={false}>
                <MarkerForm 
                    position={position}
                    onMarkerAdd={onMarkerAdd}
                    onClose={handleClose}
                    onSave={handleSaveMarker}
                />
            </Popup>
        </Marker>
    ) : null;
}
