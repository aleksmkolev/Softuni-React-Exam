import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import L from 'leaflet';
import MarkerComponent from '../marker/Marker';
import markerService from '../../services/markerService';
import '../../../public/styles/Map.css';

// Fix for the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isMapRoute = location.pathname === '/map';
  const { accessToken } = useContext(UserContext);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const data = await markerService.getAll();
        // Filter out markers without valid coordinates
        const validMarkers = data.filter(marker => 
          typeof marker.lat === 'number' && 
          typeof marker.lng === 'number' &&
          !isNaN(marker.lat) && 
          !isNaN(marker.lng)
        );
        setMarkers(validMarkers);
      } catch (error) {
        console.error('Error fetching markers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkers();
  }, []);

  const handleMarkerAdd = (newMarker) => {
    setMarkers(prevMarkers => [...prevMarkers, newMarker]);
  };

  if (loading) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="map-box">
      {isMapRoute && !accessToken && (
        <div className="map-overlay-message">
          Please log in to add markers to the map
        </div>
      )}
      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={13}
        // Disable zoom and drag on home page
        zoomControl={isMapRoute}
        dragging={isMapRoute}
        doubleClickZoom={isMapRoute}
        scrollWheelZoom={isMapRoute}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isMapRoute && accessToken && <MarkerComponent onMarkerAdd={handleMarkerAdd} />}
        {markers.map((marker, idx) => (
          marker.lat && marker.lng ? (
            <Marker 
              key={idx} 
              position={{ lat: marker.lat, lng: marker.lng }}
            >
              <Popup>
                <div className="marker-info">
                  <h3>{marker.name}</h3>
                  <p>{marker.description}</p>
                  {marker.imageUrl && (
                    <img 
                      src={marker.imageUrl} 
                      alt={marker.name}
                      style={{ maxWidth: '200px', marginTop: '10px' }}
                    />
                  )}
                  <p>Rating: {marker.rating}/10</p>
                </div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
}