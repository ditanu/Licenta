import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LoginWrapper } from "./Pages/Login";
import { Homepage } from "./Pages/Homepage";
import InscriereTrupa from "./Pages/InscriereTrupa";
import AdaugareLocatie from "./Pages/AdaugareLocatie";
import AdaugareSceneta from "./Pages/AdaugareSceneta";
import UsersDashboard from "./Pages/UsersDashboard";
import AdaugareFeedback from "./Pages/AdaugareFeedback";
import TeatruDashboard from "./Pages/TeatruDashboard";
import { AlegereLocuri } from "./Pages/AlegereLocuri";
import LocatieDashboard from "./Pages/LocatieDashboard";
import FeedbackDashboard from "./Pages/FeedbackDashboard";
import BileteRezervateDashboard from "./Pages/BileteRezervateDashboard";
import {CalendarPage} from "./Pages/calendar-shows";
import {ChartsPage} from "./Pages/chart-page";

const defaultState = {
  config: {
    id: "0",
    nume: "",
    prenume: "",
    email: "",
    parola: "",
    confirmaParola: "",
    telefon: "",
  },
  login: {
    email: "",
    parola: "",
  },
  invalidFields: new Map(),
};

export function App() {
  const [state, setState] = useState(defaultState);
  return (
    <div style={{ minHeight: "100vh", height: "fit-content" }}>
      <SpringContext.Provider value={{ state, setState }}>
        <Routes>
          <Route path={"/"} element={<LoginWrapper />} />
          <Route path={"*"} element={<div>404</div>} />
          <Route path={"/homepage"} element={<Homepage />} />
          <Route path={"/inscriere"} element={<InscriereTrupa />} />
          <Route path={"/adaugareLocatie"} element={<AdaugareLocatie />} />
          <Route path={"/adaugareSceneta"} element={<AdaugareSceneta />} />
          <Route path={"/adaugareFeedback"} element={<AdaugareFeedback />} />
          <Route path={"/usersDashboard"} element={<UsersDashboard />} />
          <Route path={"/teatruDashboard"} element={<TeatruDashboard />} />
          <Route path={"/alegereLocuri"} element={<AlegereLocuri />} />
          <Route path={"/locatieDashboard"} element={<LocatieDashboard />} />
          <Route path={"/feedbackDashboard"} element={<FeedbackDashboard />} />
          <Route path={"/calendar"} element={<CalendarPage/>} />
          <Route path={"/charts"} element={<ChartsPage/>} />
          <Route
            path={"/bileteRezervate"}
            element={<BileteRezervateDashboard />}
          />

          <></>
        </Routes>
      </SpringContext.Provider>
    </div>
  );
}

export const SpringContext = React.createContext({
  state: defaultState,
  setState: () => {},
});
