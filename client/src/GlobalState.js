import {createContext,useState,useEffect} from 'react';
import CiudadesAPI from './api/CiudadesAPI';
import UsuariosAPI from './api/UsuariosAPI';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false);

    const refreshToken = async ()=>{
      const res = await axios.get(
        "/usuario/refresh_token"
      );
      setToken(res.data.accesstoken)
    }

    useEffect(()=>{
      const firstLogin = localStorage.getItem('firstLogin')
      if(firstLogin) refreshToken()
    },[])
    
    const state = {
      token: [token, setToken],
      ciudadesAPI: CiudadesAPI(),
      usuariosAPI: UsuariosAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}