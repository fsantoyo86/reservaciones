import React, {useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/times.svg';
import Cart from './icon/cart.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";


function Headers() {

    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.usuariosAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.usuariosAPI.isAdmin;
    const idUser = state.usuariosAPI.id;

    const count = useSelector((store) => store.reservaciones.count);


    const logoutUser = async ()=>{
        await axios.get(
          "/usuario/logout"
        );
        localStorage.clear();
        setIsAdmin(false)
        setIsLogged(false)
    }

    const adminRouter = ()=>{
      return (
        <>
          
          <li>
            <Link to="/ciudades">Ciudades</Link>
          </li>
        </>
      );
    }

    const loggedRouter = () => {
      return (
        <>
          <li>
            <Link to="/" onClick={logoutUser}>Logout</Link>
          </li>
        </>
      );
    };

    return (
      <header>
        <div className="menu">
          <img src={Menu} alt="" width="30" />
        </div>
        <div className="logo">
          <img src="/globe.png" alt="" className="icon-img"/>
          <h1>
            <Link to="/">{isAdmin ? 'Admin':'Aerolínea TrueHome'}</Link>
          </h1>
        </div>
        <ul>
          {isAdmin && isLogged ? "": <li><Link to="/">Reservar</Link></li>}
          {isAdmin && adminRouter()}
          {
            isLogged ? loggedRouter() : <li><Link to="/#!">Acerca de</Link></li>
          }

          <li>
              <img src={Close} alt="" width="30" className="menu"/>
          </li>
          
        </ul>

        {
          isAdmin ? '' :  isLogged ? <div className="cart-icon">
            <span>{count}</span>
            <Link to={`/cart/${idUser}`}>
                <img src={Cart} alt="" width="30"/>
            </Link>
        </div> : ""
        }

       
      </header>
    );
}

export default Headers;
