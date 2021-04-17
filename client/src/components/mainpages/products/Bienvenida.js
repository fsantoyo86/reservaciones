import {useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {GlobalState} from '../../../GlobalState';
import { useDispatch, useSelector } from "react-redux";
import {getCiudadesAccion} from "../../../redux/ciudadesDucks";


function Products(props) {
    const state = useContext(GlobalState);
    
    const dispatch = useDispatch();
    const ciudades = useSelector((store) => store.ciudades.array);

    const [isLogged] = state.usuariosAPI.isLogged;

    const continuar = e => {
        e.preventDefault();
        props.siguiente();
    }
    const FetchCiudades = () => {
      dispatch(getCiudadesAccion());
    };

    useEffect(() => {
      FetchCiudades();
     
    });

    return (
      <>
        <div className="ciudades">
          <div className="principal-view">
            <h2>Bienvenido</h2>

            <select
              name="csalida"
              className="select-salida"
              placeholder="Salida"
              value={props.reserva.csalida}
              onChange={props.onChangeInput}
            >
              {ciudades.map((ciudad) => (
                <option key={ciudad.ciudad_id} value={ciudad.nombre}>
                  {ciudad.nombre}
                </option>
              ))}
            </select>
            <select
              name="cdestino"
              className="select-salida"
              value={props.reserva.cdestino}
              onChange={props.onChangeInput}
            >
              {ciudades.map((ciudad) => (
                <option key={ciudad.ciudad_id} value={ciudad.nombre}>
                  {ciudad.nombre}
                </option>
              ))}
            </select>
            <div className="row-data">
              <label>Fecha: </label>
              <input
                type="date"
                name="fecha"
                placeholder="Fecha"
                value={props.reserva.fecha}
                onChange={props.onChangeInput}
              />
              <label>No. Personas</label>
              <input
                type="number"
                min="1"
                max="50"
                name="noadultos"
                required
                value={props.reserva.noadultos}
                onChange={props.onChangeInput}
              />
            </div>
            
            {isLogged ? (
              <button onClick={continuar}>Siguiente</button>
            ) : (
              <div className="row">
                <Link to="/login">
                  <button>Ingresar</button>
                </Link>
                <Link to="/register">
                  <button className="register">Registrarse</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    );
}

export default Products;
