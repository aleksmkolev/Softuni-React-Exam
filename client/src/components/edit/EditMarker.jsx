import { useParams, useNavigate } from 'react-router';
import { useEditMarker, useMarker } from '../../api/mapApi';
import './EditMarker.css'



export default function EditMarker() {
    const navigate = useNavigate();
    const {markerId} = useParams(); 
    const {marker} = useMarker(markerId);
    const {editMarker} = useEditMarker(markerId);

    const formAction = async (formData) => {
        const markerData = Object.fromEntries(formData);
        await editMarker(markerId, markerData); 
        navigate(`/markers/${markerId}/details`);
    }

    return (
        <div className="outer-container">
        <div className="edit-container">
            <h2>Edit Marker Information</h2>
            <form className="form edit-form" action={formAction}>
                <label htmlFor="name">Name of Marker:</label>
                <input type="text" id="name" name="name" defaultValue={marker.name} placeholder="Name of Marker" required />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" defaultValue={marker.description} placeholder="Description" required />

                <label htmlFor="image">Image:</label>
                <input type="url" id="image" name="image" defaultValue={marker.image} placeholder="Image" required />

                <label htmlFor="rating">Rating:</label>
                <input type="number" id="rating" name="rating" defaultValue={marker.rating} placeholder="Rating" required />
                
                <input type="submit" className="btn submit" defaultValue="Edit" />
            </form>
        </div>
        </div>
    );
};