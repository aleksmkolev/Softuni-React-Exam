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

function Map() {
  const [markers, setMarkers] = useState([]);
  const location = useLocation();
  const isMapRoute = location.pathname === '/map';
  const { accessToken } = useContext(UserContext);

  useEffect(() => {
    if (isMapRoute) {
      markerService.getAll()
        .then(loadedMarkers => {
          setMarkers(loadedMarkers);
        })
        .catch(error => console.error('Failed to load markers:', error));
    }
  }, [isMapRoute]);

  const handleMarkerAdd = (newMarker) => {
    setMarkers(prevMarkers => [...prevMarkers, newMarker]);
  };

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
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;