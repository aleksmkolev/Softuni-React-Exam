import { Link } from 'react-router-dom';
import Map from '../map/Map';
import '../../../public/styles/Home.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="text-section">
                    <h1 className="home-title">
                        GlobeBox is a interactive map of the world
                    </h1>
                    <p className="home-description">
                        User can see the world map and interact with it. Set markers on the map and see the information, pictures of other users. They can also like and see other user ratings.
                    </p>
                    <Link to="/box" className="explore-button">
                        Explore Box
                    </Link>
                </div>
                <div className="map-section">
                    <Map />
                </div>
            </div>
        </div>
    );
}
