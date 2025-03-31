import 'leaflet/dist/leaflet.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Map from './components/map/Map'
import Footer from './components/footer/Footer'
import Login from './components/login/Login'
import Register from './components/register/Register'
import { UserProvider } from './contexts/UserContext.jsx'
import Home from './components/home/Home'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App