import React from 'react'

function Checkout() {
    return (
      <div className="ciudades">
        <div className="principal-view">
          <h1>Reservar</h1>
          <div className="check-out">
            <label htmlFor="">Nombre: </label>
            <input type="text" />
            <label htmlFor="">Apellido: </label>
            <input type="text" />
            <label htmlFor="">Correo: </label>
            <input type="text" />
            <label htmlFor="">Dirección: </label>
            <input type="text" />
            <button className="register">Reservar</button>
          </div>
        </div>
      </div>
    );
}

export default Checkout;
