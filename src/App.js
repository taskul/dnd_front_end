import './App.css';
import NavBar from './Routes/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import User from './API/api';
import AppRoutes from './Routes/AppRoutes';
import AuthContext from './Context/AuthContext';
import useLocalStorage from './hooks/useLocalStorage';
import MapAssetsContext from "./Context/MapAssetsContext";


export const DND_TOKEN = 'dnd_token'
export const GUILD_TOKEN = 'guild_token'


function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [token, setToken] = useLocalStorage(DND_TOKEN);
  // used to manage data when editing existing maps
  // this data will be passed on to Mapbuilder
  const [mapAssets, setMapAssets] = useState({});
  const [mapName, setMapName] = useState('');
  // manage invitation token
  const [guildToken, setGuildToken] = useLocalStorage(GUILD_TOKEN)



  useEffect(() => {
    async function getGuildToken() {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenExists = urlParams.get('token')
      if (tokenExists) {
        setGuildToken(urlParams.get('token'))
      }
    }
    getGuildToken()
  }, [])


  // manage current user
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token)
          // put the token on the API class so it can use it to call the API
          User.token = token;
          let user = await User.getCurrentUser(username);
          setCurrentUser(user)
        } catch (err) {
          setCurrentUser(null);
        }
      }
    }
    // getting the currently logged in user
    getCurrentUser();
  }, [token])

  // login handler
  const authenticate = async (userData) => {
    try {
      const response = await User.login(userData, guildToken);
      setToken(response);
      const { username } = jwtDecode(response)
      setCurrentUser(username)
      // delete invivation token if exists
      window.localStorage.removeItem(GUILD_TOKEN)
      return { success: true };
    } catch (err) {
      console.log('failed to login', err);
      return { success: false, err };
    }
  }

  // signup handler
  const signup = async (userData) => {
    try {
      const response = await User.signup(userData, guildToken);
      if (response) {
        setToken(response);
        const { username } = jwtDecode(response)
        setCurrentUser(username)
        // delete invivation token if exists
        window.localStorage.removeItem(GUILD_TOKEN)
        return { success: true }
      }
    } catch (err) {
      console.log("failed to sign up", err);
      return { success: false }
    }
  }

  const logout = () => {
    setToken(null)
    setCurrentUser(null)
    setMapName('')
    setMapAssets({})
  }


  return (
    <div>
      <BrowserRouter>
        <AuthContext.Provider value={{ currentUser, token }}>
          <MapAssetsContext.Provider value={{ mapAssets, setMapAssets, mapName, setMapName }}>
            <NavBar
              logout={logout}
            />
            <AppRoutes
              login={authenticate}
              signup={signup}
              mapAssets={mapAssets}
              setMapAssets={setMapAssets}
              mapName={mapName}
              setMapName={setMapName}
            />
          </MapAssetsContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    </div >
  )
}

export default App;
