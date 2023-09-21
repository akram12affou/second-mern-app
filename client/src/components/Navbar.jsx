import React from "react";
import '../styles/Navbar.scss'
function Navbar() {
  return (
    <div className="nav-container">
      <div>SOCIAL</div>

      <div>
        <button>home</button>
        <button>auth</button>
      </div>
    </div>
  );
}

export default Navbar;
