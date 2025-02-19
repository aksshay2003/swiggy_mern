import React from "react";

const Login = () => {
  return (
    <div className="loginSection">
      <form className="Allforms">
        <h1>Vendor Login</h1>
        <label>Email</label>

        <input type="text" placeholder="Enter your email" id="inp"/>
        <br />
        <label>Password</label>

        <input type="text" placeholder="Enter your password" id="inp"/>
        <br />
        <div className="btnsubmit">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
