import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContextInstance';
import authService from '../../services/authService';

export default function Navbar() {
    const { user } = useContext(UserContext);
    const isAuthenticated = authService.isAuthenticated();
    const userEmail = user?.email || authService.getUserEmail();

    const handleLogout = () => {
        authService.logout();
        window.location.reload(); // Refresh to update auth state
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                {isAuthenticated ? (
                    <>
                        <span className="user-email">{userEmail}</span>
                        <button onClick={handleLogout} className="nav-link">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
            <div className="nav-brand">
                <Link to="/">GlobeBox</Link>
            </div>
        </nav>
    );
}
