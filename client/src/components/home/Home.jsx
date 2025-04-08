import { Link } from 'react-router'

import './Home.css'

import MarkerArticleItem from './markerArticleItem/MarkerArticleItem';

export default function Home() {
    

    return (
        <>
            <div className="feature">
                <div className="title">
                    <h1>Globe Box</h1>
                    <Link to="/markers" className="btn see-all-btn">See all markers</Link>
                </div>
            </div>
            
        </>
    );
};