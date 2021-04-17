import {Link} from 'react-router-dom';
import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from 'axios';

function Confirm(props) {
    const state = useContext(GlobalState);
  
    const idUser = state.usuariosAPI.id;
    const newID = String(idUser);
    const tmpId = newID.split(",");
    const id = tmpId[0];

    const anterior = e =>{
        e.preventDefault()
        props.regresar()
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          "/api/reservacion",
          {
            csalida: props.reserva.csalida,
            cdestino: props.reserva.cdestino,
            fecha: props.reserva.fecha,
            tipo: props.ciudadOpt.opcionuno.nombre,
            horario: props.ciudadOpt.opcionuno.horario,
            precio: props.ciudadOpt.opcionuno.precio,
            id_usuario: `${id}`,
            noadultos: props.reserva.noadultos,
          }
        );
        window.location.href = `/cart/${idUser}`;
      } catch (err) {
        alert(err.response.data.msg);
      }
    };

    return (
      <div className="ciudades">
        <div className="principal-view">
          <ul className="confirmar">
            <li>Salida:{props.reserva.csalida}</li>
            <li>Destino:{props.reserva.cdestino}</li>
            <li>Fecha: {props.reserva.fecha}</li>
            <li>No Adultos:{props.reserva.noadultos}</li>
          </ul>
          <button onClick={anterior}>Regresar</button>
          <Link to={`/cart/${idUser}`}>
            <button onClick={handleSubmit}>Ir al Carrito</button>
          </Link>
        </div>
      </div>
    );
}

export default Confirm
