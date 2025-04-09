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
        <div className="outer-container">
            <div className="details-container">
                <div className="images-container">
                    <div className="main-img-container">
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
                <div className="marker-details-container">
                    <div className="marker-content">
                        <div className="image-container">
                            <img 
                                src={marker.image || 'https://placehold.co/450x300?text=No+Image'} 
                                alt={marker.name || 'Marker'}
                                onError={(e) => {
                                    e.target.src = 'https://placehold.co/450x300?text=Image+Not+Found';
                                }}
                            />
                        </div>
                        
                        <div className="marker-info">
                            <h1 className="marker-title">{marker.name}</h1>
                            <p className="marker-description">{marker.description}</p>
                            <div className="marker-rating">
                                Rating: {marker.rating}/10
                            </div>
                            <div className="marker-coordinates">
                                <p>Latitude: {latitude?.toFixed(6) || 'N/A'}</p>
                                <p>Longitude: {longitude?.toFixed(6) || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {isOwner
                        ?
                        <div className="btn-container">
                                    <Link to={`/markers/${markerId}/edit`} className="btn edit-btn">Edit</Link>
                            <button onClick={deletemarkerClickHandler} className="btn delete-btn">Delete</button>
                        </div>
                        : null
                    }
                </div>
            </div>
            <div className="comments-container">
                <h3>Comments:</h3>
                <div className="comment-container">

                    {comments.length > 0
                        ? comments.map(comment => <CommentItem key={comment._id} {...comment} />)
                        : <h2 className="no-comments" style={{ padding: "1em", textAlign: "center", fontSize: "1.8em" }}>No comments yet.</h2>
                    }

                </div>

                {username
                    ?
                    <div className="comment-form-container">
                        <form className="comments-form" action={formAction}>
                            <label htmlFor="comment">Comments about the marker:</label>
                            <textarea id="comment" name="comment" rows="2" cols="100" placeholder="Write your comment here..."></textarea>
                            <input type="submit" className="btn comment-btn" defaultValue="Add a comment" />
                        </form>
                    </div>
                    : null
                }

            </div>
        </div>
    );
};