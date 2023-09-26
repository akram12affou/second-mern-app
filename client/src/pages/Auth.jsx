import React from "react";
import { useState } from "react";
import "../styles/Auth.scss";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function Auth() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["accestoken"]);
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [register, setRegister] = useState(true);
  const authentificationProcces = () => {
    if (register) {
      axios
        .post("http://localhost:1258/auth/register", { username, password })
        .then((res) => {
          window.localStorage.setItem("userId", res.data.newUser._id);
          window.localStorage.setItem("username", res.data.newUser.username);
          setCookie("accestoken", res.data.token);
          navigate("/");
          alert("user created !");
        })
        .catch((err) => {
          alert("error");
        });
    } else {
      axios
        .post("http://localhost:1258/auth/login", { username, password })
        .then((res) => {
          navigate("/");
          window.localStorage.setItem("userId", res.data.user._id);
          window.localStorage.setItem("username", res.data.user.username);
          setCookie("accestoken", res.data.token);
          alert("user logged !");
        })
        .catch((err) => {
          alert("error");
          console.log(err)
        });
    }
  };
  return (
    <div className="auth-container">
      <h1>{register ? <>Register</> : <>Login</>}</h1>
      <label htmlFor="">username : </label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label htmlFor="">password : </label>
      <input
        type="text"
        onChange={(e) => setPassowrd(e.target.value)}
        value={password}
      />
      <span onClick={() => setRegister(!register)}>
        {register ? <>logged in ?</> : <>dont have an account ?</>}
      </span>
      <button onClick={authentificationProcces}>
        {register ? <>Register</> : <>Login</>}
      </button>
    </div>
  );
}

export default Auth;
