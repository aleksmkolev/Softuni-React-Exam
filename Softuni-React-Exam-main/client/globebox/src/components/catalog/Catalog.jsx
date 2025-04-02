import { useState, useEffect } from 'react';
import markerService from '../../services/markerService';
import './catalog.css';

function Catalog() {
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const data = await markerService.getAll();
        setMarkers(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers();
  }, []);

  if (error) {
    return <div className="error">Error loading markers: {error}</div>;
  }

  return (
    <div className="catalog">
      <h1>Box Catalog</h1>
      <div className="markers-grid">
        {markers.map((marker) => (
          <div key={marker._id} className="marker-card">
            <h3>{marker.name}</h3>
            <p>Rating: {marker.rating}/10</p>
            <p>Description: {marker.description}</p>
            {marker.imageUrl && <img src={marker.imageUrl} alt={marker.name} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
