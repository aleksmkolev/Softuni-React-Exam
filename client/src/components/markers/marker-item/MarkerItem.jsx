import { Link } from 'react-router'



export default function MarkerItem({
    _id, name, description, image, rating,
}) {

    return (
        <section className="marker-item">
            <div className="main-img-container">
                <img src={image} alt="park image or logo" width="450px" />
            </div>
            <div className="marker-details-container">
                <div className="name-and-location-container">
                    <h2>{name}</h2>
                    <p className="location">{description}</p>
                    <p className="address">{rating}</p>
                </div>
                
                <div className="btn-container">
                    <Link to={`/markers/${_id}/details`} className="btn see-more-btn">See more...</Link>
                </div>
            </div>
        </section>
    );
};