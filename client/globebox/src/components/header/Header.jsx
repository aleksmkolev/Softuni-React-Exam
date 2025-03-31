import { Link } from 'react-router-dom';
import '../../../public/styles/Header.css';

function Header() {
    return (
      <header className="app-header">
        <Link to="/" className="logo-link">
          <h1>GlobeBox Map</h1>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/map" className="nav-link">Map</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </nav>
      </header>
    );
}

export default Header;