import {useEffect} from "react";
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getReservacionesAccion,getTotalAccion } from "../../../redux/reservacionesDucks";
import {Link} from 'react-router-dom';
import axios from "axios";

function Cart() {
  const {id} = useParams();
  const array = id.split(",");
  const newId = array[0];

  const dispatch = useDispatch();
  const reservaciones = useSelector((store) => store.reservaciones.array);
  const total = useSelector((store) => store.reservaciones.total);

  const FetchReservaciones = async () => {
    await dispatch(getReservacionesAccion());  
  };
  
  const FetchSumaATotal = async (newId) =>{
    await dispatch(getTotalAccion(newId));
  }

  const eliminar = async (id)=>{
      await axios.delete(
        `/api/reservacion/${id}`
      );
  }
  
  useEffect(() => {
    FetchReservaciones();
    FetchSumaATotal(newId);
  });

  return (
    <div className="cart-check">
      {reservaciones.map((reser) =>
        reser.id_usuario === newId ? (
          <div key={reser._id} className="card-cart">
            <div>
              <h3>Salida: {reser.csalida}</h3>
              <h3>Destino: {reser.cdestino}</h3>
              <h3>Horario: {reser.horario}</h3>
              <h3>Fecha: {reser.fecha}</h3>
              <h3>No. Adultos: {reser.noadultos}</h3>
              <h3>Tipo: {reser.tipo}</h3>
            </div>
            <div>
              <h1 className="precio-tag">Precio: $ {reser.precio}</h1>
              <button className="eliminar" onClick={()=>eliminar(reser._id)}>Eliminar</button>
            </div>
          </div>
        ) : (
          ""
        )
      )}
      <div className="Total">
        <h1>Total: $ {total}</h1>
        <Link to='/checkout'><button className="pagar">Proceder</button></Link>
      </div>
    </div>
  );
}

export default Cart;
