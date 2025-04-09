import './MarkerPrime.css'

import MarkerItem from './marker-item/MarkerItem'
import { useMarkers } from '../../api/mapApi';

export default function Markers() {
    const {markers} = useMarkers(); 

    return (
        <div className="markers-container">
            <div className="markers-grid">
                <h2 className="markers-title">All Markers</h2>
                
                {markers.length > 0 ? (
                    markers.map(marker => (
                        <MarkerItem key={marker._id} {...marker} />
                    ))
                ) : (
                    <p className="no-markers">No markers available yet.</p>
                )}
            </div>
        </div>
    );
};