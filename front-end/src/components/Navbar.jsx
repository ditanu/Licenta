import React, { useRef } from "react";
import { FaBars, FaTimes, FaReact } from "react-icons/fa";
import "./Navbar.css";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { BsCameraReels } from "react-icons/bs";
import { VscAdd } from "react-icons/vsc";
import { AiOutlineHome } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Homepage } from "../Pages/Homepage";
import logo from "../assets/STS_logo_white.png";

function Navbar() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive");
  };
  const getUserType = localStorage.getItem("tipDeUser");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("tipDeUser");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div className="container">
      {/* Renders a react icon with the size of 40px */}
      <img className="logo" src={logo} style={{ width: 100 }} />
      {/* Sets the navRef as a reference to the nav element */}
      <nav ref={navRef}>
        <Link
          to="/homepage"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AiOutlineHome size={25} />
          Home
        </Link>
        {/* <a href="/inscriere">Înscrie trupa la festival</a> */}

        <Link
          to="/adaugareFeedback"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VscAdd size={25} />
          Feedback
        </Link>

        {getUserType == 1 && (
          <Link
            to="/adaugareSceneta"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VscAdd size={25} />
            Scenetă
          </Link>
        )}
        {getUserType == 1 && (
          <Link
            to="/adaugareLocatie"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VscAdd size={25} />
            Locație
          </Link>
        )}
        {getUserType == 1 && (
          <Link
            to="/usersDashboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RxDashboard size={25} />
            Users
          </Link>
        )}
        {getUserType == 1 && (
          <Link
            to="/teatruDashboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RxDashboard size={25} />
            Trupe
          </Link>
        )}
        {getUserType == 1 && (
          <Link
            to="/locatieDashboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RxDashboard size={25} />
            Locații
          </Link>
        )}
        {getUserType == 1 && (
          <Link
            to="/feedbackDashboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RxDashboard size={25} />
            Feedbacks
          </Link>
        )}
        {getUserType == 1 && (
          <Link
            to="/bileteRezervate"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RxDashboard size={25} />
            Bilete
          </Link>
        )}
        {getUserType == 1 && (
          <Link
            to="/charts"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RxDashboard size={25} />
            Grafice
          </Link>
        )}

        {/* Renders a button with the class of nav-btn nav-close-btn and an FaTimes icon inside */}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      {/* Renders a button with the class of nav-btn and an FaBars icon inside */}
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ borderRadius: 10, width: 100 }}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}

export default Navbar;
