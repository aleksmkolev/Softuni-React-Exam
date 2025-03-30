import '../../../public/styles/Header.css';

function Header() {
    return (
      <header className="app-header">
        <h1>GlobeBox Map</h1>
        <nav className="nav-links">
          <a href="/" className="nav-link">Map</a>
          <a href="/login" className="nav-link">Login</a>
          <a href="/register" className="nav-link">Register</a>
        </nav>
      </header>
    );
  }
  
  export default Header;