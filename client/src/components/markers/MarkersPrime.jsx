import './MarkerPrime.css'

import MarkerItem from './marker-item/MarkerItem'
import { useMarkers } from '../../api/mapApi';

export default function Markers() {
    const {markers} = useMarkers(); 

    return (
        <div id="outer-container" className="outer-container">
            <h1 className="all-markers">Markers</h1>
            <div className="search-container">
                
            </div>
            <div className="markers-container">

                {markers.length > 0
                    ? markers.map(marker => <MarkerItem key={marker._id} {...marker} />)
                    : <h3 className="no-markers" style={{paddingTop: "2em", paddingBottom: "5em", textAlign: "center"}}>No markers yet.</h3>
                }

            </div>
        </div>
    );
};