import { Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import markerService from '../../services/markerService';
import MarkerPrompt from './MarkerPrompt';

export default function MarkerComponent({ onMarkerAdd }) {
    const [tempMarker, setTempMarker] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptPosition, setPromptPosition] = useState({ x: 0, y: 0 });
    const [showAbove, setShowAbove] = useState(true);
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

    const map = useMapEvents({
        click: (e) => {
            if (!accessToken) return;

            const point = map.latLngToContainerPoint(e.latlng);
            
            const spaceAbove = point.y > 25;
            setShowAbove(spaceAbove);

            setPromptPosition({
                x: point.x,
                y: spaceAbove ? point.y - 2 : point.y + 2
            });
            setTempMarker(e.latlng);
            setShowPrompt(true);
        },
    });

    const handleSaveMarker = async () => {
        if (tempMarker && accessToken) {
            try {
                await markerService.create(tempMarker);
                onMarkerAdd(tempMarker);
            } catch (error) {
                console.error('Failed to save marker:', error);
            }
        }
        setShowPrompt(false);
        setTempMarker(null);
    };

    const handleCancelMarker = () => {
        setShowPrompt(false);
        setTempMarker(null);
    };

    if (!accessToken) {
        return null;
    }

    return (
        <>
            {showPrompt && <div className="overlay" />}
            {tempMarker && <Marker position={tempMarker} icon={defaultIcon} />}
            {showPrompt && (
                <MarkerPrompt
                    showAbove={showAbove}
                    promptPosition={promptPosition}
                    onSave={handleSaveMarker}
                    onCancel={handleCancelMarker}
                />
            )}
        </>
    );
}
