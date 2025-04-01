import { Link } from 'react-router-dom';
import Map from '../map/Map';
import '../../../public/styles/Home.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="text-section">
                    <h1 className="home-title">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </h1>
                    <p className="home-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/" className="explore-button">
                        Explore More
                    </Link>
                </div>
                <div className="map-section">
                    <Map />
                </div>
            </div>
        </div>
    );
}
