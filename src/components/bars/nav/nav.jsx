import React from "react";
import { useHistory } from "react-router-dom";
import "./nav.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ExitSession } from "../../../actions/index.js";


export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  var userData = localStorage.getItem("UserLogin");
  var userLoginData = {
    name: "Guest",
    id: 0
  };
if (userData) {
  userLoginData = JSON.parse(userData);
}
  
function handleExitSession() {
  try{
    dispatch(ExitSession())
    .then(() => {
      Swal.fire("Closed Session", "Session successfully closed", "success").then(
       () => history.push("/")
      )
    });
  }
  catch(e){
    console.log(e);
  }
  }

  return (
        <nav className="menu">
          <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/Create'>Create new TODO</a></li>
          </ul>
          <ul>
            {userLoginData.id !== 0 ? (
        <>
          <li>
          <img src={userLoginData.photo} alt="user_image"/>
          </li>
          <li>
            <p>Welcome, {userLoginData.name}!</p>
          </li>
          <li>
            <button onClick={() => handleExitSession()} className="button">Logout</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <p>Guest Session</p>
          </li>
        </>
      )}
          </ul>
        </nav>
    );
}