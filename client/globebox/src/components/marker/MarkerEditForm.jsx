import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useEditMarker, useMarker } from '../../api/globeApi';
import './MarkerEditForm.css';

export default function MarkerEditForm() {
    const { markerId } = useParams();
    const navigate = useNavigate();
    const { editMarker } = useEditMarker();
    const { marker } = useMarker(markerId);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        rating: '5',
        lat: 0,
        lng: 0
    });

    useEffect(() => {
        if (marker) {
            setFormData({
                name: marker.name || '',
                description: marker.description || '',
                imageUrl: marker.imageUrl || '',
                rating: marker.rating || '5',
                lat: Number(marker.lat) || 0,
                lng: Number(marker.lng) || 0
            });
        }
    }, [marker]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editMarker(markerId, formData);
            navigate('/box');
        } catch (error) {
            console.error('Error updating marker:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
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
                        value={formData.name}
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
                        value={formData.description}
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
                        value={formData.imageUrl}
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
                        value={formData.rating}
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