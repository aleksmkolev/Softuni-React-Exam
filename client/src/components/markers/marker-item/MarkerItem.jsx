import { Link } from 'react-router-dom'
import './MarkerItem.css'


export default function MarkerItem({
    _id, name, image,
}) {
    return (
        <div className="marker-item-card">
            <div className="marker-item-img-container">
                <img 
                    className="marker-item-img"
                    src={image || 'https://placehold.co/300x200?text=No+Image'} 
                    alt={name}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/300x200?text=Image+Not+Found';
                    }}
                />
                <Link to={`/markers/${_id}/details`} className="marker-item-hover-btn">
                    See Details
                </Link>
            </div>
            <div className="marker-item-details">
                <div className="marker-item-title-container">
                    <h2>{name}</h2>
                </div>
                <div className="marker-item-btn-container">
                    <Link to={`/markers/${_id}/details`} className="marker-item-more-btn">
                        See more...
                    </Link>
                </div>
            </div>
        </div>
    );
};