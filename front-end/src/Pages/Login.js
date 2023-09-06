import { useAccessForm, useLogin } from "../useAccessForm";
import { AccessFormContext, LoginContext } from "../context";
import React, { useContext, useState } from "react";
import { SpringContext } from "../App";
import { ConfigInput } from "../components/ConfigInput";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { state, setState } = useContext(SpringContext);
  const { email, parola } = useContext(LoginContext);
  const { nume, prenume, confirmaParola, telefon } =
    useContext(AccessFormContext);
  const navigate = useNavigate();

  const onSignUp = () => {
    axios
      .post(`http://localhost:8080/api/utilizator/register`, {
        nume: nume.value,
        prenume: prenume.value,
        email: email.value,
        parola: parola.value,
        telefon: telefon.value,
      })
      .then(() => {
        console.log("registerDone");
        console.log(nume);
        toast("Te-ai înscris cu succes!", {
          type: "success",
        });
      })
      .catch((e) => {
        toast("Oh no, something went wrong!", { type: "error" });
        console.error(e);
      });
  };

  const onLogin = () => {
    axios
      .post(`http://localhost:8080/api/utilizator/login`, {
        email: email.value,
        parola: parola.value,
      })
      .then((res) => {
        if (res.status === 200) {
          //TODO eu iti trimit din back id-ul userului logat (res.data.userId) ca sa ii dai setState sa iti mearga profilul, sunt inapt si nu stiu sa il pun singur
          setState({
            ...state,
            config: { ...state.config, id: res.data.user.id },
          });
          localStorage.setItem("id", res.data.user.id);
          localStorage.setItem("tipDeUser", res.data.user.tipDeUser);
          navigate("/homepage");
        }
      })
      .catch((e) => {
        console.error(e);
        toast("Oh no, something went wrong!", { type: "error" });
      });
  };
  //   console.log(state.invalidFields);
  return (
    <div className={"login-page"}>
      <div className={"login-main-container"}>
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className={"signup-container"}>
          <div className={"form signup-form"}>
            <label htmlFor="chk" aria-hidden="true" className={"bigger-label"}>
              Sign up
            </label>
            <ConfigInput
              label={"Nume"}
              value={nume.value}
              onChange={nume.onChange}
              error={nume.error}
              className={"login-input"}
              inputColor={"white"}
            />
            <ConfigInput
              label={"Prenume"}
              value={prenume.value}
              onChange={prenume.onChange}
              error={prenume.error}
              className={"login-input"}
              inputColor={"white"}
            />
            <ConfigInput
              label={"Email"}
              value={email.value}
              onChange={email.onChange}
              error={email.error}
              className={"login-input"}
              inputColor={"white"}
            />
            <ConfigInput
              label={"Telefon"}
              value={telefon.value}
              onChange={telefon.onChange}
              error={telefon.error}
              className={"login-input"}
              inputColor={"white"}
            />
            <ConfigInput
              label={"Parola"}
              value={parola.value}
              onChange={parola.onChange}
              error={parola.error}
              className={"login-input"}
              inputColor={"white"}
              type={"Password"}
            />
            <ConfigInput
              label={"Confirmă parola"}
              value={confirmaParola.value}
              onChange={confirmaParola.onChange}
              error={confirmaParola.error}
              className={"login-input"}
              inputColor={"white"}
              type={"Password"}
            />

            <button disabled={state.invalidFields.size > 0} onClick={onSignUp}>
              Sign up
            </button>
          </div>
        </div>

        <div className={"login-container"}>
          <div className={"form login-form"}>
            <label htmlFor="chk" aria-hidden="false" className={"bigger-label"}>
              Login
            </label>
            <ConfigInput
              label={"Email"}
              value={email.value}
              onChange={email.onChange}
              error={email.error}
              className={"login-input"}
            />
            <ConfigInput
              type={"Password"}
              label={"Parola"}
              value={parola.value}
              onChange={parola.onChange}
              error={parola.error}
              className={"login-input"}
            />
            <button onClick={onLogin}>Login</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export function LoginWrapper() {
  const value = useLogin();
  const accessFormSettings = useAccessForm();
  return (
    <div>
      <AccessFormContext.Provider value={accessFormSettings}>
        <LoginContext.Provider value={value}>
          <Login />
        </LoginContext.Provider>
      </AccessFormContext.Provider>
    </div>
  );
}
