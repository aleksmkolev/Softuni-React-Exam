import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { customIcon } from './marker/Marker';
import { useCreateMarker, useMarkers } from '../../api/mapApi';
import './Map.css';

// Component to handle click events
function LocationMarker({ onLocationSelect, onSpotAdded, refreshMarkers }) {
    const [position, setPosition] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        rating: '5'
    });
    const map = useMap();
    const { createMarker } = useCreateMarker();

    useMapEvents({
        click(e) {
            const newPosition = e.latlng;
            setPosition(newPosition);
            if (onLocationSelect) {
                onLocationSelect(newPosition);
            }
            
            // Simplified map centering
            if (map && newPosition) {
                const offset = 150; // pixels to offset upward
                const point = map.latLngToContainerPoint(newPosition);
                const newPoint = point.subtract([0, offset]);
                const newLatLng = map.containerPointToLatLng(newPoint);
                map.flyTo(newLatLng, map.getZoom());
            }
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedSpot = await createMarker({
                ...formData,
                latitude: position.lat,
                longitude: position.lng
            });
            
            // Reset form
            setFormData({
                name: '',
                description: '',
                image: '',
                rating: '5'
            });
            setPosition(null);
            
            // Notify parent component
            if (onSpotAdded) {
                onSpotAdded(savedSpot);
            }
            
            // Refresh markers after adding new one
            refreshMarkers();
            
            // Show success message
            alert('Spot added successfully!');
            
        } catch (error) {
            console.error('Error saving spot:', error);
            alert('Failed to save spot. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return position === null ? null : (
        <Marker position={position} icon={customIcon}>
            <Popup 
                autoPan={true}
                autoPanPadding={[50, 50]}
            >
                <form onSubmit={handleSubmit} className="marker-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Spot name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="url"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Rating (1-10):</label>
                        <input
                            type="range"
                            name="rating"
                            min="1"
                            max="10"
                            value={formData.rating}
                            onChange={handleChange}
                        />
                        <span>{formData.rating}</span>
                    </div>
                    <div className="form-group">
                        <p className="coordinates">
                            <span>Lat: {position.lat.toFixed(6)}</span>
                            <span>Lng: {position.lng.toFixed(6)}</span>
                        </p>
                    </div>
                    <button type="submit" className="submit-btn">Add Spot</button>
                </form>
            </Popup>
        </Marker>
    );
}

export default function Map({ onLocationSelect, onSpotAdded }) {
    const defaultCenter = [42.7339, 25.4858];
    const defaultZoom = 7;
    const { markers = [], getMarkers } = useMarkers();
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        getMarkers();
    }, [refreshKey, getMarkers]);

    const refreshMarkers = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="map-container">
            <MapContainer 
                center={defaultCenter} 
                zoom={defaultZoom} 
                className="map-container"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker 
                    onLocationSelect={onLocationSelect} 
                    onSpotAdded={onSpotAdded}
                    refreshMarkers={refreshMarkers}
                />
                
                {/* Display all existing markers with validation */}
                {Array.isArray(markers) && markers.map(marker => {
                    // Validate coordinates before rendering marker
                    if (!marker?.latitude || !marker?.longitude) {
                        return null;
                    }
                    return (
                        <Marker 
                            key={marker._id} 
                            position={[marker.latitude, marker.longitude]}
                            icon={customIcon}
                        >
                            <Popup>
                                <div className="marker-popup">
                                    <h3>{marker.name}</h3>
                                    <p>{marker.description}</p>
                                    <p className="rating">Rating: {marker.rating}/10</p>
                                    {marker.image && (
                                        <img 
                                            src={marker.image} 
                                            alt={marker.name} 
                                            style={{width: '100%', marginTop: '8px'}} 
                                        />
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
