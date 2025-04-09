import { useNavigate } from 'react-router';
import { useState } from 'react';

import './CreateMarker.css'
import { useCreateMarker } from '../../api/mapApi';

export default function CreateMarker() {
    const navigate = useNavigate();
    const { createMarker } = useCreateMarker();
    const [rating, setRating] = useState(5);

    const submitAction = async (formData) => {
        const markerData = Object.fromEntries(formData);
        const createdMarker = await createMarker({...markerData});
        const markerId = createdMarker._id;
        navigate(`/markers/${markerId}/details`);
    }

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    return (
        <div className="create-marker">
            <h2>Add a Marker</h2>
            <form action={submitAction}>   
                <div className="form-group">
                    <label htmlFor="name">Name of Marker</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Enter marker name" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        placeholder="Enter description" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input 
                        type="url" 
                        id="image" 
                        name="image" 
                        placeholder="Enter image URL" 
                        required 
                    />
                </div>

                <div className="form-group rating-group">
                    <label htmlFor="rating">Rating</label>
                    <input 
                        type="range" 
                        id="rating" 
                        name="rating" 
                        min="1" 
                        max="10" 
                        value={rating}
                        onChange={handleRatingChange}
                        required 
                    />
                    <span>{rating}</span>
                </div>

                <div className="coordinates-group">
                    <div className="form-group">
                        <label htmlFor="latitude">Latitude</label>
                        <input 
                            type="number" 
                            id="latitude" 
                            name="latitude" 
                            placeholder="Enter latitude" 
                            step="any"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="longitude">Longitude</label>
                        <input 
                            type="number" 
                            id="longitude" 
                            name="longitude" 
                            placeholder="Enter longitude" 
                            step="any"
                            required 
                        />
                    </div>
                </div>

                <button type="submit" className="submit-btn">
                    Add Marker
                </button>
            </form>
        </div>
    );
};