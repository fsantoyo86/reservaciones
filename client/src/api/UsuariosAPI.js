import {useState,useEffect} from 'react';
import axios from 'axios';


function UsuariosAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [u_id, setId] = useState()

    useEffect(()=>{
        if(token){
            const getUser= async ()=>{
                try {
                    const res = await axios.get(
                      "/usuario/infor",
                      {
                        headers: { Authorization: token },
                      }
                    );
                    setId(res.data._id)
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        id: [u_id,setId]
    }
}

export default UsuariosAPI;
