import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import markerService from '../../services/markerService';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './catalog.css';

function Catalog() {
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const data = await markerService.getAll();
        console.log('Markers:', data); // Debug log
        setMarkers(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers();
  }, []);

  const handleEdit = (markerId) => {
    navigate(`/edit/${markerId}`);
  };

  const handleDelete = async (markerId) => {
    if (window.confirm('Are you sure you want to delete this marker?')) {
      try {
        await markerService.delete(markerId, accessToken);
        setMarkers(markers.filter(marker => marker._id !== markerId));
      } catch (error) {
        setError('Failed to delete marker');
        console.error('Error deleting marker:', error);
      }
    }
  };

  const isAuthenticated = () => {
    return !!accessToken;
  };

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
            <p>Description: {marker.description || marker.info}</p>
            {(marker.imageUrl || marker.mainImageUrl) && 
              <img src={marker.imageUrl || marker.mainImageUrl} alt={marker.name} />
            }
            {isAuthenticated() ? (
              <div className="marker-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(marker._id)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(marker._id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <p className="auth-message">Login to edit/delete</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
