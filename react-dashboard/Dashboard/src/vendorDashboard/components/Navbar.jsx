import React from "react";
import "../../App.css";
const Navbar = () => {
  return (
    <>
      <div className="navsection">
        <div className="company">vendordashboard</div>
        <div className="userAuth">
          <span>Login/</span>

          <span>Register</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
