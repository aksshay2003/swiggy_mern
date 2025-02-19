import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Login from "../components/Forms/Login";

const LandingPage = () => {
  return (
    <>
      <section className="LandingName">
        <Navbar />
        <div className="sideandlogin">
          <Sidebar />
          <Login />
        </div>
      </section>
    </>
  );
};
export default LandingPage;
