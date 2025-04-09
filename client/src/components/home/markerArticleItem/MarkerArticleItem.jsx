import { Link } from 'react-router'

export default function MarkerArticleItem({
    _id, name, image
}) {

    return (
        <article className="marker-article-item">
            <div className="info-container">
                <h2>{name}</h2>
                <div className="img-container">
                    <img src={image} alt="" width="400px" />
                </div>
            </div>
            <Link to={`/markers/${_id}/details`} className="btn see-more-btn">See more...</Link>
        </article>
    );
};