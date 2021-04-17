import { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { useDispatch, useSelector } from "react-redux";
import { getCiudadesAccion } from "../../../redux/ciudadesDucks";

function Ciudades() {
  const state = useContext(GlobalState);

  const [isAdmin] = state.usuariosAPI.isAdmin;
  const dispatch = useDispatch();
  const ciudades = useSelector((store) => store.ciudades.array);

  const FetchCiudades = () => {
    dispatch(getCiudadesAccion());
  };

  useEffect(() => {
    FetchCiudades();
  });

  return (
    <div className="ciudades-container">
      {isAdmin ? (
        ciudades.map((ciudad) => (
          <div className="ciudades-lista">
            <h1>Nombre : {ciudad.nombre}</h1>
            <h2>Opción 1: {ciudad.opcionuno.nombre}</h2>
            <h2>Horario: {ciudad.opcionuno.horario}</h2>
            <h2>Precio: {ciudad.opcionuno.precio}</h2>
            <h2>Opción 2: {ciudad.opciondos.nombre}</h2>
            <h2>Horario: {ciudad.opciondos.horario}</h2>
            <h2>Precio: {ciudad.opciondos.precio}</h2>
            <h2>Opción 3: {ciudad.opciontres.nombre}</h2>
            <h2>Horario: {ciudad.opciontres.horario}</h2>
            <h2>Precio: {ciudad.opciontres.precio}</h2>
          </div>
        ))
      ) : (
        <div>
          <h1>Restringido. Permiso Administrador</h1>
        </div>
      )}
    </div>
  );
}

export default Ciudades;
