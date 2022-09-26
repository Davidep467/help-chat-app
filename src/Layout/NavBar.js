import classes from "./NavBar.module.css";
import logo from "../../src/assets/logo.png";
import { logout } from "../firebase";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { AuthContext } from "../store/auth";
import React, { useContext } from "react";
const NavBar = () => {
  const { user } = useContext(AuthContext);

  let navigate = useNavigate();
  const Logout = (event) => {
    event.preventDefault();
    logout();
    navigate("/");
  };
  const Redir = user ? "/HelperChat" : "/HelperLogin";

  return (
    <header className={classes.Header}>
    <Link to="/"></Link>  <img src={logo} alt="" className={classes.Logo} />
      <NavLink
        style={({ isActive }) => ({ color: isActive ? "#964316" : "#201400" })}
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        style={({ isActive }) => ({ color: isActive ? "#964316" : "#201400" })}
        target="_blank"
        to={Redir}
      >
        Operator Chat
      </NavLink>

      {user ? <button onClick={Logout}>Logout</button> : <button style={{visibility: "hidden"}} onClick={Logout}>Space</button>}
    </header>
  );
};

export default NavBar;
