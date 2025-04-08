import { useNavigate } from 'react-router';

import './CreateMarker.css'
import { useCreateMarker } from '../../api/mapApi';

export default function CreateMarker() {
    const navigate = useNavigate();
    const { createMarker } = useCreateMarker();

    const submitAction = async (formData) => {
        const markerData = Object.fromEntries(formData);
        const createdMarker = await createMarker({...markerData});
        const markerId = createdMarker._id;
        navigate(`/markers/${markerId}/details`);
    }

    return (
        <div className="outer-container">
            <div className="create-container">
                <h2>Add a Marker</h2>
                <form className="form create-form" action={submitAction}>   
                    <label htmlFor="name">Name of Marker:</label>
                    <input type="text" id="name" name="name" placeholder="Name of Marker" required />

                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" placeholder="Description" required />

                    <label htmlFor="image">Image:</label>
                    <input type="url" id="image" name="image" placeholder="Image" required />

                    <label htmlFor="rating">Rating:</label>
                    <input type="number" id="rating" name="rating" placeholder="Rating" required />

                    <label htmlFor="latitude">Latitude:</label>
                    <input type="number" id="latitude" name="latitude" placeholder="Latitude" required />

                    <label htmlFor="longitude">Longitude:</label>
                    <input type="number" id="longitude" name="longitude" placeholder="Longitude" required />

                    <input type="submit" className="btn submit" value="Add" />
                </form>
            </div>
        </div>
    );
};