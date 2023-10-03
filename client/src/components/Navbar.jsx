import React from "react";
import "../styles/Navbar.scss";
import avatar from '../images/userAvatar.png'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
function Navbar() {
  const {loading , error , user,dispatch} = useContext(AuthContext)
  const navigate = useNavigate();
  const [cookie, _, removeCookie] = useCookies(["accestoken"]);
  const logout = () => {
    dispatch({type:'LOGOUT'})
    removeCookie('accestoken')
    navigate('/')
  }
  return (
    <div className="nav-container">
        <button onClick={() => navigate("/")}>home</button>
        {cookie.accestoken ? (
          <>
          <button  onClick={() => navigate("/saved-recipes")}>saved Posts</button>
       
          {loading ? 'Update ...': <>   <img onClick={() => navigate("/update-user")} src={user?.image || avatar} alt="" />
          <span className="user-name">{user?.username }</span></>}
          <>
          </>
       
          <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/auth")}>connect</button>
        )}
    
    </div>
  );
}

export default Navbar;
