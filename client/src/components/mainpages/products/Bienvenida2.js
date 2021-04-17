import {useContext} from 'react';
import { GlobalState } from "../../../GlobalState";



function Bienvenida2(props) {
  const state = useContext(GlobalState);
  const [isLogged] = state.usuariosAPI.isLogged;
  const ciudadOpt = props.ciudadOpt;

  const anterior = e =>{
    e.preventDefault();
    props.regresar();
  }
  const continuar = (e) => {
    e.preventDefault();
    props.siguiente();
  };
  
  return (
    <>
      {isLogged ? (
        <div className="ciudades">
          <div className="principal-view">
            <div className="container-list">
              <div className="card">
                <div>
                  <h2>Opción 1: </h2>
                  <h2>Tipo: {ciudadOpt.opcionuno.nombre}</h2>
                  <h2>Horario: {ciudadOpt.opcionuno.horario}</h2>
                  <h2>Precio:$ {ciudadOpt.opcionuno.precio}</h2>
                </div>
                <input
                  type="radio"
                  name="radio"
                  className="radio"
                  checked
                  onChange={props.onChangeInput}
                  value="opcion1"
                />
              </div>
              <div className="card">
                <div>
                  <h2>Opción 2: </h2>
                  <h2>Tipo: {ciudadOpt.opciondos.nombre}</h2>
                  <h2>Horario: {ciudadOpt.opciondos.horario}</h2>
                  <h2>Precio: ${ciudadOpt.opciondos.precio}</h2>
                </div>
                <input
                  type="radio"
                  name="radio"
                  className="radio"
                  onChange={props.onChangeInput}
                  value="opcion2"
                />
              </div>
              <div className="card">
                <div>
                  <h2>Opción 3: </h2>
                  <h2>Tipo: {ciudadOpt.opciontres.nombre}</h2>
                  <h2>Horario: {ciudadOpt.opciontres.horario}</h2>
                  <h2>Precio: ${ciudadOpt.opciontres.precio}</h2>
                </div>
                <input
                  type="radio"
                  name="radio"
                  className="radio"
                  onChange={props.onChangeInput}
                  value="opcion3"
                />
              </div>
            </div>
            <button onClick={anterior}>Regresar</button>
            <button onClick={continuar}>Siguiente</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Bienvenida2;
