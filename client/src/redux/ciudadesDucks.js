import axios from "axios";

//Creación de constantes
const dataInicial ={
    array :[],
    ciudadOpt:"",
}

//Creación de types
const GET_CIUDADES = 'GET_CIUDADES';
const GET_OPCIONES = "GET_OPCIONES";


//Creación de reducer

export default function ciudadesReducer (state=dataInicial, action) {
    switch (action.type) {
      case GET_CIUDADES:
        return { ...state, array: action.payload };
      case GET_OPCIONES:
        return {...state,
            array: action.payload.array,
            ciudadOpt: action.payload.ciudadOpt  
        };
      
      default:
        return state;
    }
}

//Creación de acciones
export const getCiudadesAccion = () => async (dispatch, getState) => {

    try {
        const res = await axios.get(
          "/api/ciudad"
        );
        dispatch({
          type: GET_CIUDADES,
          payload: res.data,
        });
    } catch (error) {
        console.log(error);
    }
}

export const getOpcionesCiudad = (ciudad) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "/api/ciudad",
      {
        ciudad_id: "res",
        nombre: ciudad,
      }
    );
    dispatch({
      type: GET_OPCIONES,
      payload: {array: res.data, ciudadOpt: res.data},
    });
  } catch (error) {
    console.log(error);
  }
};