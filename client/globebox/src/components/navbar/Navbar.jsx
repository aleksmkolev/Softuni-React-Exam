import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContextInstance';
import authService from '../../services/authService';

export default function Navbar() {
    const { auth, isAuthenticated } = useContext(UserContext);

    const handleLogout = async () => {
        await authService.logout();
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">GlobeBox</Link>
            </div>
            <div className="nav-links">
                {isAuthenticated ? (
                    <>
                        <span className="user-email">{auth.email}</span>
                        <button onClick={handleLogout} className="nav-link">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
