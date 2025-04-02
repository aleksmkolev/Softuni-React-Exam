import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import markerService from '../../services/markerService';
import '../../../public/styles/Login.css';

export default function MarkerForm({ onMarkerAdd, position = { lat: 0, lng: 0 }, onClose }) {
    const { accessToken } = useContext(UserContext);
    const [marker, setMarker] = useState({
        name: '',
        description: '',
        imageUrl: '',
        rating: '5',
        lat: position.lat,
        lng: position.lng
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedMarker = await markerService.create(marker, accessToken);
            onMarkerAdd(savedMarker);
            onClose();
        } catch (error) {
            console.error('Error creating marker:', error);
        }
    };

    return (
        <div className="auth-container" style={{ 
            minHeight: 'auto', 
            padding: '0.25rem',
            width: '100%',
            maxWidth: '500px' // Reduced width
        }}>
            <form className="auth-form" style={{ padding: '1rem' }} onSubmit={handleSubmit}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Add New Marker</h2>
                
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                    <label htmlFor="name" style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.2rem' }}>
                        Name of Location:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={marker.name}
                        onChange={(e) => setMarker(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter the name of the location"
                        required
                        style={{ width: '98%', padding: '0.5rem' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                    <label htmlFor="description" style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.2rem' }}>
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={marker.description}
                        onChange={(e) => setMarker(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the location"
                        required
                        style={{ width: '98%', minHeight: '60px', padding: '0.5rem' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                    <label htmlFor="imageUrl" style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.2rem' }}>
                        Image URL:
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        value={marker.imageUrl}
                        onChange={(e) => setMarker(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="Enter the URL of an image"
                        required
                        style={{ width: '98%', padding: '0.5rem' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                    <label htmlFor="rating" style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.2rem' }}>
                        Rating (1-10):
                    </label>
                    <select
                        id="rating"
                        value={marker.rating}
                        onChange={(e) => setMarker(prev => ({ ...prev, rating: e.target.value }))}
                        required
                        style={{ 
                            width: '98%',
                            color: '#000',
                            backgroundColor: '#fff',
                            padding: '0.5rem'
                        }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-actions" style={{ 
                    gap: '0.5rem',
                    marginTop: '0.75rem'
                }}>
                    <button 
                        type="submit" 
                        className="submit-btn"
                        style={{
                            padding: '0.4rem 0.8rem',
                            fontSize: '0.85rem',
                            width: 'auto',
                            minWidth: '90px'
                        }}
                    >
                        Add Marker
                    </button>
                    <button 
                        type="button" 
                        className="submit-btn" 
                        onClick={onClose} 
                        style={{
                            backgroundColor: '#ff4646',
                            padding: '0.4rem 0.8rem',
                            fontSize: '0.85rem',
                            width: 'auto',
                            minWidth: '90px'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
} 