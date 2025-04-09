import { useParams, useNavigate } from 'react-router';
import { useEditMarker, useMarker } from '../../api/mapApi';
import { useState, useEffect } from 'react';
import './EditMarker.css'

export default function EditMarker() {
    const navigate = useNavigate();
    const {markerId} = useParams(); 
    const {marker} = useMarker(markerId);
    const {editMarker} = useEditMarker(markerId);
    const [rating, setRating] = useState(marker?.rating || 1);

    useEffect(() => {
        if (marker?.rating) {
            setRating(marker.rating);
        }
    }, [marker]);

    const formAction = async (formData) => {
        const markerData = Object.fromEntries(formData);
        await editMarker(markerId, markerData); 
        navigate(`/markers/${markerId}/details`);
    }

    const handleCancel = () => {
        navigate(`/markers/${markerId}/details`);
    };

    return (
        <div className="edit-marker-outer-container">
            <div className="edit-marker-container">
                <h2 className="edit-marker-title">Edit Marker Information</h2>
                <form className="edit-marker-form" action={formAction}>
                    <label className="edit-marker-label" htmlFor="name">Name of Marker:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        defaultValue={marker.name} 
                        placeholder="Name of Marker" 
                        className="edit-marker-input"
                        required 
                    />

                    <label className="edit-marker-label" htmlFor="description">Description:</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        defaultValue={marker.description} 
                        placeholder="Description" 
                        className="edit-marker-textarea"
                        required 
                    />

                    <label className="edit-marker-label" htmlFor="image">Image:</label>
                    <input 
                        type="url" 
                        id="image" 
                        name="image" 
                        defaultValue={marker.image} 
                        placeholder="Image URL" 
                        className="edit-marker-input"
                        required 
                    />

                    <div className="edit-marker-rating-container">
                        <label className="edit-marker-label" htmlFor="rating">
                            Rating: <span className="edit-marker-rating-value">{rating}/10</span>
                        </label>
                        <input 
                            type="range" 
                            id="rating" 
                            name="rating" 
                            min="1"
                            max="10"
                            step="1"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="edit-marker-rating-slider"
                            required 
                        />
                    </div>
                    
                    <div className="edit-marker-btn-container">
                        <button type="submit" className="edit-marker-submit-btn">
                            Save
                        </button>
                        <button 
                            type="button" 
                            className="edit-marker-cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};