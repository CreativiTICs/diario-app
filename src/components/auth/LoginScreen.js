import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  //Importamos el hook useDispatch para utilizarlo fácilmente
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "carlos@gmail.com",
    password: "123456",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <img
        className="auth__icon-cr"
        src="https://creativitics.net/wp-content/uploads/Icono-CreativiTICs.png"
        alt="CreativiTICs"
      />
      <h3 className="auth__title">Loggeate</h3>
      <form
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Entrar
        </button>
        <div className="auth__social-networks">
          <p className="auth__p-social">Registrate con Tus Redes Sociales </p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Registrate con Google</b>
            </p>
          </div>
          <Link to="/auth/register" className="link">
            Crear una nueva cuenta
          </Link>
        </div>
      </form>
    </>
  );
};
