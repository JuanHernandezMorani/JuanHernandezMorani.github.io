import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import NavBar from '../../components/bars/nav/nav.jsx';
import { LoginUser } from "../../actions/index.js";
import error from "../../assets/error.svg";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const satusUser = useSelector((state) => state.user);
  const [errors, setErrors] = useState({ Error: "Error inicial" });
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  function validate(e) {
    const validateEmails = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const validatePassword = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    const errors = {};
    if (!e.email) {
      errors.email = "Mail required!";
    } else if (!validateEmails.test(e.email)) {
      errors.email = "Mail incorrect";
    }
    if (!e.password.length) {
      errors.password = "Password required!";
    } else if (!validatePassword.test(e.password)) {
      errors.password = "Password must have a capital letter and a number.";
    } else if (e.password.length < 8) {
      errors.password = "Password must have 8 characters";
    }

    return errors;
  }

  function handleCheckSingIn(e) {
    const value = { ...signIn, [e.target.name]: e.target.value };
    setSignIn(value);
    setErrors(validate(value));
  }

  function handlerSubmit() {
    dispatch(LoginUser(signIn));
    setSignIn({
      email: "",
      password: "",
    });
    history.push('/');
  }
  return (
    <div>
      <NavBar/>
      {satusUser === "Guest" ? (
        <section className="section">
          <div className="page">
            <div className="welcome">
              <h2>Welcome!!</h2>
              <p>Dont have an account?</p>
              <Link to="/register">
                <button className="sign_in">Register</button>
              </Link>
            </div>
            <div className="sign_up">
              <form onSubmit={() => handlerSubmit()}>
                <h2>Login</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => handleCheckSingIn(e)}
                  required
                />
                <br />
                {errors.email && <p>{errors.email}</p>}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleCheckSingIn(e)}
                  required
                />
                <br />
                {errors.password && <p>{errors.password}</p>}
                {Object.keys(errors).length !== 0 ? (
                  <input
                    type="submit"
                    name="sign_up"
                    value="sign in"
                    className="up-off"
                    disabled={true}
                  />
                ) : (
                  <input
                    type="submit"
                    name="sign_up"
                    value="sign in"
                    className="up"
                  />
                )}
              </form>
            </div>
          </div>
        </section>
      ) : (
        <div className="error">
      <img src={error} alt="error" />
      <h2>No results found</h2>
    </div>
      )}
    </div>
  );
}