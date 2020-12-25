import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithNameEmailPassword } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Carlos",
    email: "carlos@gmail.com",
    password: "123456",
    password2: "123456",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormvalid()) {
      dispatch(startRegisterWithNameEmailPassword(email, password, name));
    }
  };

  const isFormvalid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("El nombre es requerido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("El email no es válido"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          "La contraseña debe tener al menos 5 caracteres y debe coincidir"
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <img
        className="auth__icon-cr"
        src="https://creativitics.net/wp-content/uploads/Icono-CreativiTICs.png"
        alt="CreativiTICs"
      />
      <h3 className="auth__title">Regístrate</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          className="auth__input"
          type="text"
          placeholder="Nombre"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

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
        <input
          className="auth__input"
          type="password"
          placeholder="Confirma tu password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block">
          Registrarse
        </button>
        <Link to="/auth/login" className="link">
          ¿Ya tienes cuenta?
        </Link>
      </form>
    </>
  );
};
