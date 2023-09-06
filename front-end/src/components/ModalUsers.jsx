import React, { useEffect, useState } from "react";
import "../index.css";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalUsersComponent(props) {
  const { user, setIsEditing, updateUser } = props;

  const [nume, setNume] = useState(user?.nume);
  const [prenume, setPrenume] = useState(user?.prenume);
  const [email, setEmail] = useState(user?.email);
  const [telefon, setTelefon] = useState(user?.telefon);
  const [tipUser, setTipUser] = useState(user?.tipDeUser);

  const id = user?.id;

  if (user === null) return null;

  const handleUpdateUser = async () => {
    const sentUser = {
      nume,
      prenume,
      email,
      telefon,
      tipDeUser: tipUser,
    };
    const response = await fetch(`http://localhost:8080/api/utilizator/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sentUser),
    });
    const data = await response.json();
    const status = response.status;
    if (status === 200) {
      updateUser(data.user);
      toast.success("User-ul a fost editat!");
    } else {
      toast.warning("User-ul nu a putut fii editat!");
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
            Nume User : {nume} {prenume}
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
              Prenume:
            </p>
            <input
              value={prenume}
              onChange={(e) => setPrenume(e.target.value)}
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
              Telefon:
            </p>
            <input
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
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
              Mail:
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Tip Utilizator:
            </p>
            <input
              value={tipUser}
              onChange={(e) => setTipUser(e.target.value)}
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
