import { Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState, useContext } from 'react';
import markerService from '../../services/markerService';
import { UserContext } from '../../contexts/UserContextInstance';
import MarkerPrompt from './MarkerPrompt';

export default function MarkerComponent({ onMarkerAdd }) {
    const { isAuthenticated } = useContext(UserContext);
    const [tempMarker, setTempMarker] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptPosition, setPromptPosition] = useState({ x: 0, y: 0 });
    const [showAbove, setShowAbove] = useState(true);

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
            // Only proceed if user is authenticated
            if (!isAuthenticated) {
                return;
            }

            const point = map.latLngToContainerPoint(e.latlng);
            
            // Check if there's enough space above the marker
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
        if (tempMarker) {
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

    // Don't render anything if user is not authenticated
    if (!isAuthenticated) {
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
