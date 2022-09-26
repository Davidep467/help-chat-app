import { SignIn } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./HelperLogin.module.css";
const HelperLogin = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emaillog = (event) => {
    setEmail(event.target.value);
  };
  const passlog = (event) => {
    setPassword(event.target.value);
  };
  const Login = (event) => {
    event.preventDefault();
    SignIn(email, password);
    navigate("/HelperChat");
  };

  return (
    <div>
      <h1 className={classes.LoginTitle}>LOGIN</h1>
      <form className={classes.LoginForm} onSubmit={Login}>
        <div>
          <h3>Email</h3>
          <input
            className={classes.Field}
            value={email}
            onChange={emaillog}
            required
          />
          <br />
          <h3>Password</h3>
          <input
            className={classes.Field}
            value={password}
            onChange={passlog}
            required
          />
          <br />
          <div>
            <button className={classes.LoginButton}>Go</button>
          </div>
          <div className={classes.Credentials}>
            <p>Michael.Test@fantasytravels.com</p>
            <p>Abc123++</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HelperLogin;
