import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router'
import { useContext } from 'react';

import './markerDetails.css'

import { useMarker, useDeleteMarker } from '../../api/mapApi';
import { UserContext } from '../../contexts/UserContext';
import { useComments, useCreateComment } from '../../api/commentsApi';
import CommentItem from './comments-item/CommentItem';

export default function MarkerDetails() {
    const navigate = useNavigate();
    const { markerId } = useParams();
    const { marker } = useMarker(markerId);
    const { deleteMarker } = useDeleteMarker();
    const { _id: userId, username } = useContext(UserContext);
    const { comments, setComments } = useComments(markerId);
    const { createComment } = useCreateComment();

    const isOwner = marker._ownerId === userId;

    // Convert coordinates to numbers and handle potential null/undefined values
    const latitude = marker?.latitude ? Number(marker.latitude) : null;
    const longitude = marker?.longitude ? Number(marker.longitude) : null;

    const formAction = async (formData) => {
        const commentData = Object.fromEntries(formData);
        const comment = await createComment(markerId, username, commentData.comment);

        if (!comment) {
            return;
        }

        setComments(state => [...state, comment])
    }

    const deletemarkerClickHandler = async () => {
        const hasDeleteConfirm = confirm(`Are you sure you want to delete ${marker.name}?`);

        if (!hasDeleteConfirm) {
            return;
        }

        await deleteMarker(markerId);
        navigate('/markers');
    }

    return (
        <div className="marker-details-outer-container">
            <div className="marker-details-card">
                <div className="marker-details-images">
                    <div className="marker-details-main-img">
                        <img 
                            src={marker.image || 'https://placehold.co/450x300?text=No+Image'} 
                            alt={`${marker.name || 'Marker'}`}
                            width="450"
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/450x300?text=Image+Not+Found';
                            }}
                        />
                    </div>
                </div>
                <div className="marker-details-info-container">
                    <div className="marker-details-content">
                        <div className="marker-details-info">
                            <h1 className="marker-details-title">{marker.name}</h1>
                            <p className="marker-details-description">{marker.description}</p>
                            <div className="marker-details-rating">
                                Rating: {marker.rating}/10
                            </div>
                            <div className="marker-details-coordinates">
                                <p>Latitude: {latitude?.toFixed(6) || 'N/A'}</p>
                                <p>Longitude: {longitude?.toFixed(6) || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="marker-details-btn-container">
                            <Link to={`/markers/${markerId}/edit`} className="marker-details-btn marker-details-edit-btn">Edit</Link>
                            <button onClick={deletemarkerClickHandler} className="marker-details-btn marker-details-delete-btn">Delete</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="marker-details-comments">
                <h3>Comments:</h3>
                <div className="marker-details-comment-list">
                    {comments.length > 0
                        ? comments.map(comment => <CommentItem key={comment._id} {...comment} />)
                        : <h2 className="marker-details-no-comments">No comments yet.</h2>
                    }
                </div>

                {username && (
                    <div className="marker-details-comment-form">
                        <form className="marker-details-form" action={formAction}>
                            <label htmlFor="comment">Comments about the marker:</label>
                            <textarea id="comment" name="comment" rows="2" cols="100" placeholder="Write your comment here..."></textarea>
                            <input type="submit" className="marker-details-btn marker-details-comment-btn" defaultValue="Add a comment" />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};