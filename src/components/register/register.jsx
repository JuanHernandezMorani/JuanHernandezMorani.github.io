import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister } from "../../actions/index.js";
import error from "../../assets/error.svg";
import NavBar from '../../components/bars/nav/nav.jsx';

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const satusUser = useSelector((state) => state.user);
  const [errors, setErrors] = useState({ Error: "error inicial" });
  const [singUp, setSingUp] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  function validate(e) {
    let errors = {};
    if (!e.name) {
      errors.name = "Name required!";
    } else if (e.name.length < 4) {
      errors.name = "Name must have at last 4 characters!";
    } else if (e.name.length > 255) {
      errors.name = `Name too long (Characters: ${e.name.length} / 255)`;
    } else if (!e.email.length) {
      errors.email = "Mail required!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        e.email
      )
    ) {
      errors.email = "Mail incorrect";
    } else if (e.email.length > 255) {
      errors.email = `Mail too long (Characters: ${e.name.length} / 255)`;
    } else if (!e.password.length) {
      errors.password = "Password required!";
    } else if (!/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(e.password)) {
      errors.password = "Password must have a capital letter and a number.";
    } else if (e.password.length < 8) {
      errors.password = "Password must have 8 characters";
    } else if (e.password.length > 50) {
      errors.password = `Password too long (Characters: ${e.name.length} / 50)`;
    } else if (!e.password2.length) {
      errors.password2 = "Please confirm password!";
    } else if (e.password2 !== singUp.password) {
      errors.password2 = "Passwords do not match";
    }

    return errors;
  }

  function handdleCheckSingUp(e) {
    const value = { ...singUp, [e.target.name]: e.target.value };
    setSingUp(value);
    setErrors(validate(value));
  }

  function handleSubmit() {
    const post = {
      name: singUp.name,
      email: singUp.email,
      password: singUp.password
    };
    dispatch(UserRegister(post));
    setSingUp({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
    history.push("/login");
  }

  return (
    <div>
      <NavBar/>
      {satusUser === "Guest" ? (
        <section className="section">
          <div className="page">
            <div className="welcome">
              <h2>Welcome!!</h2>
              <p>Already registered? sign in</p>
              <Link to="/login">
                <button className="sign_in">
                  Login
                </button>
              </Link>
            </div>
            <div className="sign_up">
              <form onSubmit={() => handleSubmit()}>
                <h2>Sign Up</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={singUp.name}
                  onChange={(e) => handdleCheckSingUp(e)}
                  required
                />
                <br />
                {errors.name && <p>{errors.name}</p>}
                <input
                  type="email"
                  name="email"
                  placeholder="Mail"
                  onChange={(e) => handdleCheckSingUp(e)}
                  required
                />
                <br />
                {errors.email && <p>{errors.email}</p>}
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  onChange={(e) => handdleCheckSingUp(e)}
                  required
                />
                <br />
                {errors.password && <p>{errors.password}</p>}
                <input
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  onChange={(e) => handdleCheckSingUp(e)}
                  required
                />
                <br />
                {errors.password2 && <p>{errors.password2}</p>}
                {Object.keys(errors).length !== 0 ? (
                  <input
                    type="submit"
                    name="sign_up"
                    value="Sign up"
                    className="up-off"
                    disabled={true}
                  />
                ) : (
                  <input
                    type="submit"
                    name="sign_up"
                    value="Sign up"
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