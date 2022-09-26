import { SignIn, SignUp } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HelperLogin = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailreg = (event) => {
    setEmail(event.target.value);
  };
  const passreg = (event) => {
    setPassword(event.target.value);
  };
  const Register = (event) => {
    event.preventDefault();
    SignUp(email, password);
    navigate("/HelperChat");
  };
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
      <h2>REGISTER</h2>
      <form onSubmit={Register}>
        <div style={{ marginLeft: "100px", marginTop: "100px" }}>
          Email
          <input value={email} onChange={emailreg} required />
          <br />
          Password
          <input value={password} onChange={passreg} required />
          <br />
          <button>Go</button>
        </div>
      </form>
      <h2>LOGIN</h2>
      <form onSubmit={Login}>
        <div style={{ marginLeft: "100px", marginTop: "100px" }}>
          Email
          <input value={email} onChange={emaillog} required />
          <br />
          Password
          <input value={password} onChange={passlog} required />
          <br />
          <button>Go</button>
          <p>test@test.com</p>
          <p>66666666</p>
        </div>
      </form>
    </div>
  );
};

export default HelperLogin;
