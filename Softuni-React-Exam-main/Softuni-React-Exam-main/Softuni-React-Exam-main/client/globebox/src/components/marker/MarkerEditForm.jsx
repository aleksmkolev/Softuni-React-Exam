import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import markerService from '../../services/markerService';
import './MarkerEditForm.css';

export default function MarkerEditForm() {
    const { markerId } = useParams();
    const navigate = useNavigate();
    const { accessToken } = useContext(UserContext);
    const [marker, setMarker] = useState({
        name: '',
        description: '',
        imageUrl: '',
        rating: '5',
        lat: 0,
        lng: 0
    });

    useEffect(() => {
        const fetchMarker = async () => {
            try {
                const data = await markerService.getById(markerId);
                setMarker({
                    ...data,
                    lat: Number(data.lat) || 0,
                    lng: Number(data.lng) || 0
                });
            } catch (error) {
                console.error('Error fetching marker:', error);
            }
        };
        fetchMarker();
    }, [markerId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                name: marker.name,
                description: marker.description,
                imageUrl: marker.imageUrl,
                rating: marker.rating,
                lat: marker.lat,
                lng: marker.lng
            };

            await markerService.edit(markerId, formData, accessToken);
            navigate('/box');
        } catch (error) {
            console.error('Error updating marker:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMarker(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="outer-container">
            <form className="catalog-form" onSubmit={handleSubmit}>
                <h2>Edit Marker</h2>
                
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={marker.name}
                        onChange={handleChange}
                        placeholder="Enter marker name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={marker.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={marker.imageUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        name="rating"
                        value={marker.rating}
                        onChange={handleChange}
                        required
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate('/box')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
} 