import React from "react";
import "../styles/Navbar.scss";
import { useGetUserInfo } from "../hooks/getUserInfo";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
function Navbar() {
  const {loading , error , user,dispatch} = useContext(AuthContext)
  const navigate = useNavigate();
  const [cookie, _, removeCookie] = useCookies(["accestoken"]);
  const logout = () => {
    window.localStorage.removeItem('user')
    removeCookie('accestoken')
    navigate('/')
  }
  
  return (
    <div className="nav-container">
        <button onClick={() => navigate("/")}>home</button>
        {cookie.accestoken ? (
          <>
          <button  onClick={() => navigate("/saved-recipes")}>saved Posts</button>
          \\\
          <span className="user-name">{user?.username}</span>
          <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/auth")}>connect</button>
        )}
    
    </div>
  );
}

export default Navbar;
