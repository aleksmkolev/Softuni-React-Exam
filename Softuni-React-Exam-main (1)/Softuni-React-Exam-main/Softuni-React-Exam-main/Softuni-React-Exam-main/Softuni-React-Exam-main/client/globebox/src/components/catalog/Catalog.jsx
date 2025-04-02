import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarkers } from '../../api/globeApi';
import likeService from '../../services/likeService';
import { deleteMarker } from '../../api/globeApi';
import { UserContext } from '../../contexts/UserContext';
import './catalog.css';

function Catalog() {
  const [markers, setMarkers] = useState([]);
  const [likes, setLikes] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { accessToken, email, _id } = useContext(UserContext);
  const { getAllMarkers } = useMarkers();

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const data = await getAllMarkers();
        console.log('Marker data:', data);
        setMarkers(data);
        
        // Fetch likes for each marker
        const likesData = {};
        for (const marker of data) {
          const markerLikes = await likeService.getLikesByMarkerId(marker._id);
          likesData[marker._id] = {
            count: markerLikes.length,
            hasLiked: accessToken ? await likeService.hasUserLiked(marker._id, email) : false
          };
        }
        setLikes(likesData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers();
  }, [accessToken, email, getAllMarkers]);

  const handleEdit = (markerId) => {
    navigate(`/edit/${markerId}`);
  };

  const handleDelete = async (markerId) => {
    if (window.confirm('Are you sure you want to delete this marker?')) {
      try {
        await deleteMarker(markerId, accessToken);
        setMarkers(markers.filter(marker => marker._id !== markerId));
      } catch (error) {
        setError('Failed to delete marker');
        console.error('Error deleting marker:', error);
      }
    }
  };

  const handleLike = async (markerId) => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    try {
      await likeService.like(markerId, email);
      setLikes(prev => ({
        ...prev,
        [markerId]: {
          count: prev[markerId].count + 1,
          hasLiked: true
        }
      }));
    } catch (error) {
      console.error('Error liking marker:', error);
    }
  };

  const isOwner = (marker) => {
    console.log('User ID:', _id);
    console.log('Marker owner:', marker._ownerId);
    return marker._ownerId === _id;
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
            <div className="marker-actions">
              <div className="likes-section">
                <button 
                  className={`like-btn ${likes[marker._id]?.hasLiked ? 'liked' : ''}`}
                  onClick={() => handleLike(marker._id)}
                  disabled={likes[marker._id]?.hasLiked}
                >
                  ❤️ {likes[marker._id]?.count || 0}
                </button>
              </div>
              {accessToken && isOwner(marker) && (
                <>
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
