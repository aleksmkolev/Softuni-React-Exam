import 'leaflet/dist/leaflet.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Map from './components/map/Map'
import Footer from './components/footer/Footer'
import Login from './components/login/Login'
import Register from './components/register/Register'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
