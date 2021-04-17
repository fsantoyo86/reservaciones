import axios from "axios";

//Creación de constantes
const dataInicial ={
    array :[],
    total:0.0,
    count:0
}

//Creación de types
const GET_RESERVACIONES = 'GET_RESERVACIONES';
const GET_TOTAL = 'GET_TOTAL';

//Creación de reducer

export default function reservacionesReducer (state=dataInicial, action) {
    switch (action.type) {
      case GET_RESERVACIONES:
        return { ...state, array: action.payload };
      
      case GET_TOTAL:
        return {
          ...state,
          array: action.payload.array,
          total: action.payload.total,
          count: action.payload.count
        };
      default:
        return state;
    }
}

//Creación de acciones
export const getReservacionesAccion = () => async (dispatch, getState) => {
  try {
        const res = await axios.get(
          "/api/reservacion"
        );
        dispatch({
          type: GET_RESERVACIONES,
          payload: res.data.reservaciones
        });
    } catch (error) {
        console.log(error);
    }
}

export const getTotalAccion = (newId) => async (dispatch, getState) => {
  let suma = 0.0;
  let tmpCount = 0;

  try {
    const res = await axios.get(
      "/api/reservacion"
    );
    await res.data.reservaciones.map((r) => {
      if(r.id_usuario === newId) {suma = suma + r.precio; tmpCount=tmpCount+1}
      return res
    });
    dispatch({
      type: GET_TOTAL,
      payload: {array:res.data.reservaciones,total:suma,count:tmpCount},
    });
  } catch (error) {
    console.log(error);
  }
};
