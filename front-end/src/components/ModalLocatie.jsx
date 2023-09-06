import React, { useEffect, useState } from "react";
import "../index.css";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ModalLocatie(props) {
  const { user, setIsEditing, updateUser } = props;

  const [nume, setNume] = useState(user?.nume);
  const [nrLocuri, setNrLocuri] = useState(user?.nrLocuri);
  const [strada, setStrada] = useState(user?.strada);

  const id = user?.id;

  if (user === null) return null;

  const handleUpdateUser = async () => {
    const sentUser = {
      id,
      nume,
      nrLocuri,
      strada,
    };
    try {
      await axios
        .put(`http://localhost:8080/api/locatie/${id}`, sentUser)
        .then((res) => {
          toast.success("Locație actualizată cu succes!");
        });
      updateUser(sentUser);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.warning("Locația nu a putut fi actualizată!");
    }
  };

  return (
    <div
      className="ModalOverlay"
      style={{
        fontFamily: "Montserrat",
      }}
    >
      <div
        className="modal"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "38rem",
          height: "26rem",
          borderRadius: "1rem",
          zIndex: "50",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          overflow: "hidden",
          boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.75)",
        }}
      >
        <div
          className="modalTitle"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20%",
            width: "100%",
            backgroundColor: "#3f51b5",
          }}
        >
          <Typography
            style={{
              margin: "0 auto",
              fontSize: "1.3rem",
              fontWeight: "500",
              color: "white",
            }}
          >
            Nume Locatie : {nume}
          </Typography>
          <span onClick={() => setIsEditing(false)}>
            <CloseIcon
              style={{
                cursor: "pointer",
                justifySelf: "flex-end",
                alignSelf: "flex-start",
                margin: "1rem 1rem 0 0 ",
                color: "rgba(225, 225, 225)",
              }}
            ></CloseIcon>
          </span>
        </div>
        <div
          className="modalContent"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "80%",
            width: "100%",
            backgroundColor: "rgba(225, 225, 225)",
            justifyContent: "center",

            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <div
            className="modalContentInput"
            style={{
              display: "flex",
              margin: "0 1rem",
              gap: "0.2rem",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className="modalLabel" style={{ width: "25%" }}>
              Nume:
            </p>
            <input
              value={nume}
              onChange={(e) => setNume(e.target.value)}
              className="modalInput"
              style={{ width: "75%", marginRight: "2rem" }}
            ></input>
          </div>
          <div
            className="modalContentInput"
            style={{
              display: "flex",
              margin: "0 1rem",
              gap: "0.2rem",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className="modalLabel" style={{ width: "25%" }}>
              Număr Locuri:
            </p>
            <input
              value={nrLocuri}
              onChange={(e) => setNrLocuri(e.target.value)}
              className="modalInput"
              style={{ width: "75%", marginRight: "2rem" }}
            ></input>
          </div>
          <div
            className="modalContentInput"
            style={{
              display: "flex",
              margin: "0 1rem",
              gap: "0.2rem",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className="modalLabel" style={{ width: "25%" }}>
              Strada:
            </p>
            <input
              value={strada}
              onChange={(e) => setStrada(e.target.value)}
              className="modalInput"
              style={{ width: "75%", marginRight: "2rem" }}
            ></input>
          </div>

          <button
            onClick={handleUpdateUser}
            style={{
              justifySelf: "flex-end",
              marginBottom: "3rem",
              color: "white",
              fontWeight: "500",
              borderRadius: "0.5rem",
              backgroundColor: "#3f51b5",
              alignSelf: "flex-end",
              marginBottom: "-1rem",
            }}
          >
            Confirmă
          </button>
        </div>
      </div>
    </div>
  );
}
