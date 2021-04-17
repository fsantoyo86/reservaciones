import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [usuario, setUsuario] = useState({
      nombre: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/usuario/register",
        { ...usuario }
      );
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
          <h2>Register</h2>
        <input
          type="text"
          name="nombre"
          required
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={onChangeInput}
        />
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
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
