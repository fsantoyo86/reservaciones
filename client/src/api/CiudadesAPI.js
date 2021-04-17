import {useState,useEffect} from 'react';
import axios from 'axios';

function CiudadesAPI() {
    const [ciudad, setCiudad] = useState([]);

    const getCiudades = async () => {
      const res = await axios.get(
        "/api/ciudad"
      );
      await setCiudad(res.data)
    };

    useEffect(()=>{
        getCiudades()
    },[])

    return {
        ciudad: [ciudad, setCiudad]
    }
}

export default CiudadesAPI
