import { Link } from 'react-router'

import './Header.css'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
// import styles from './Header.module.css'

export default function Header() {
    const { username, email } = useContext(UserContext);

    return (
        <header>
            <div id="logo-container">
                <p className="logo" id="logo"><Link to="/">Globe Box</Link></p>
            </div>
            <nav>
                <div className="nav-items-container" id="nav-items-container">
                    <ul className="nav-items">
                        <li> <Link to="/">Home</Link></li>
                        <li> <Link to="/markers">Box</Link></li>

                        {username
                            ? (
                                <>
                                    {/* <!-- loggedIn user --> */}
                                    <li> <Link className="map" to="/map">Map</Link></li>
                                    <li> <Link className="create" to="/markers/create">Add</Link></li>
                                    <li><span className="user-email">{email}</span></li>
                                    <li> <Link className="logout" to="/logout">Log out</Link></li>
                                    
                                </>
                            )
                            : (
                                <>
                                    {/* <!-- all users --> */}
                                    
                                    <li> <Link className="login" to="/login">Log in</Link></li>
                                    <li> <Link className="register" to="/register">Register</Link></li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
};