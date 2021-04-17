import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [usuario,setUsuario] = useState({
        email: '', password: ''
    });

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUsuario({...usuario, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post(
              "/usuario/login",
              {...usuario }
            );
            localStorage.setItem('firstLogin',true);
            window.location.href ="/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
      <div className="login-page">
        <form onSubmit={loginSubmit}>
            <h2>Login</h2>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={usuario.email}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="password"
            required
            autoComplete="on"
            placeholder="Password"
            value={usuario.password}
            onChange={onChangeInput}
          />
          <div className="row">
              <button type="submit">Ingresar</button>
              <Link to="/register">Registrarse</Link>
          </div>
        </form>
      </div>
    );
}

export default Login
