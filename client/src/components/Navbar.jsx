import React from "react";
import "../styles/Navbar.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["accestoken"]);
  const logout = () => {
    removeCookie('accestoken')
  }
  return (
    <div className="nav-container">
      <div>SOCIAL</div>
      <div>
        <button onClick={() => navigate("/")}>home</button>
        {cookie.accestoken ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => navigate("/auth")}>connect</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
