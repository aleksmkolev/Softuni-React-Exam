import { Link } from 'react-router-dom'

import './PageNotFound.css'

export default function PageNotFound() {
    return (
        <div className='page-not-found-container'>
            <h1>404</h1>
            <p>Oops,  <Link to="/">Click here</Link> to go back to the home page.</p>
        </div>
    );
};