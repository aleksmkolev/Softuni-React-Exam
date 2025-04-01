import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContextInstance';
import { useNavigate } from 'react-router-dom';
import '../../../public/styles/Header.css';
import authService from '../../services/authService';

function Header() {
    const { auth, userLogoutHandler } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        userLogoutHandler();
        // Clear local storage
        authService.logout();
        navigate('/');
    };

    return (
      <header className="app-header">
        <Link to="/" className="logo-link">
          <h1>GlobeBox Map</h1>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/map" className="nav-link">Map</Link>
          
          {!auth?.accessToken ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          ) : (
            <>
              <span className="user-email">{auth.email}</span>
              <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
            </>
          )}
        </nav>
      </header>
    );
}

export default Header;