import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import MarkerComponent from '../marker/Marker';
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

  const handleMarkerAdd = (newMarker) => {
    setMarkers([...markers, newMarker]);
  };

  return (
    <div className="map-box">
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
        {isMapRoute && <MarkerComponent onMarkerAdd={handleMarkerAdd} />}
        {markers.map((position, idx) => (
          <Marker 
            key={idx} 
            position={position}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;