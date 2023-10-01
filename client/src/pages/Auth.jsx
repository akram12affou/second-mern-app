import React from "react";
import { useState } from "react";
import "../styles/Auth.scss";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
function Auth() {
  const navigate = useNavigate();
  const {loading , error ,user,dispatch} = useContext(AuthContext)
  const [cookie, setCookie, _] = useCookies(["accestoken"]);
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [register, setRegister] = useState(true);
  const authentificationProcces = () => {
    dispatch({type:'LOGIN_START'});
    if (register) {
      axios.post("http://localhost:1258/auth/register", { username, password })
        .then((res) => {
          dispatch({type:'LOGIN_SUCCES' , payload:res.data.user })
          setCookie("accestoken", res.data.token);
          navigate("/");
          alert("user created !");
        })
        .catch((err) => {
          dispatch({type:'LOGIN_FAILED' , payload:err.response.data.message })
        });
    } else {
      axios.post("http://localhost:1258/auth/login", { username, password })
        .then((res) => {
          dispatch({type:'LOGIN_SUCCES' , payload:res.data.user })
          navigate("/");
          setCookie("accestoken", res.data.token);
          alert("user logged !");
        })
        .catch((err) => {
          dispatch({type:'LOGIN_FAILED' , payload:err.response.data.message })
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
      {loading && <center><p>auth procces ...</p></center>}
      <code style={{color: 'red'}}>{error}</code>
    </div>
  );
}

export default Auth;
