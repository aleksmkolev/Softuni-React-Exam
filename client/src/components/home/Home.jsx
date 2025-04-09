import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Globe from 'react-globe.gl';
import './Home.css';

export default function Home() {
    const globeEl = useRef();
    const markers = [
        { lat: 42.6977, lng: 23.3219, size: 0.2, color: '#646cff' }, // Sofia
        { lat: 51.5074, lng: -0.1278, size: 0.2, color: '#646cff' }, // London
    ];

    useEffect(() => {
        // Auto-rotate
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;
            globeEl.current.controls().maxDistance = 1000;
            globeEl.current.controls().minDistance = 100;

            const globe = globeEl.current;
            globe.pointOfView({ altitude: 2.5 });
        }
    }, []);

    return (
        <div className="home-container">
            <div className="globe-container">
                <Globe
                    ref={globeEl}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    pointsData={markers}
                    pointAltitude={0.1}
                    pointColor="color"
                    pointRadius="size"
                    atmosphereColor="#646cff"
                    pointsMerge={true}
                />
            </div>
            
            <div className="feature">
                <div className="title">
                    <h1>Globe Box</h1>
                    <Link to="/markers" className="see-all-btn">See all markers</Link>
                    <p className="home-description">
                        An interactive map of the world in which you can set, edit, delete, rate, comment markers.
                        Lets explore and share together!
                    </p>
                </div>
            </div>
        </div>
    );
}