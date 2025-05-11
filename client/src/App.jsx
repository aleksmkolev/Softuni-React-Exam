import { Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './components/header/Header'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'
import Markers from './components/markers/MarkersPrime'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import Register from './components/register/Register'
import CreateMarker from './components/create/CreateMarker'
import EditMarker from './components/edit/EditMarker'
import MarkerDetails from './components/marker-details/MarkerDetails'
import PageNotFound from './components/page-not-found/PageNotFound'
import Map from './components/Map/Map'
import { UserContext } from './contexts/UserContext'
import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'
import useLocalStorage from './hooks/useLocalStorage'




console.log(import.meta.env.VITE_APP_SERVER_URL)


function App() {
  const [authData, setAuthData] = useLocalStorage('auth',{});

  const userLoginHandler = (resultData) => {
    setAuthData(resultData);
  };

  const userRegisterHandler = ({email, username, accessToken, _id}) => {
    setAuthData({email, username, accessToken, _id});
  };

  const useLogoutHandler = () => {
    setAuthData({});
  };

  return (
    <UserContext.Provider value={{ ...authData, userLoginHandler, userRegisterHandler, useLogoutHandler }}>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/markers" element={<Markers />} />
        
        <Route path="/markers/:markerId/details" element={<MarkerDetails />} />
        <Route element={<AuthGuard />}>
          <Route path="/markers/create" element={<CreateMarker />} />
          <Route path="/markers/:markerId/edit" element={<EditMarker />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/map" element={<Map />} />
        </Route>
        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </UserContext.Provider>
  )
}

export default App
