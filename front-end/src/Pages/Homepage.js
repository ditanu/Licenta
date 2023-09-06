import "./Homepage.css";
import React from "react";
import Button from "@mui/material/Button";

import ControlledAccordions, {
  showsMockData,
} from "../components/ControledAccordion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const mockBilete = [
  {
    locuri_rezervate: '["D9","D10","D11"]',
    createdAt: "2023-05-10T16:24:12.000Z",
    updatedAt: "2023-05-10T16:24:12.000Z",
    utilizatorId: 1,
    scenetaId: 1,
  },
  {
    locuri_rezervate: '["G13","G12"]',
    createdAt: "2023-05-11T09:07:19.000Z",
    updatedAt: "2023-05-11T09:07:19.000Z",
    utilizatorId: 1,
    scenetaId: 4,
  },
  {
    locuri_rezervate: '["E9","E10"]',
    createdAt: "2023-05-11T09:03:49.000Z",
    updatedAt: "2023-05-11T09:03:49.000Z",
    utilizatorId: 2,
    scenetaId: 1,
  },
  {
    locuri_rezervate: '["G10","G11"]',
    createdAt: "2023-05-19T10:34:07.000Z",
    updatedAt: "2023-05-19T10:34:07.000Z",
    utilizatorId: 4,
    scenetaId: 1,
  },
  {
    locuri_rezervate: '["F12","F13"]',
    createdAt: "2023-05-19T10:34:16.000Z",
    updatedAt: "2023-05-19T10:34:16.000Z",
    utilizatorId: 4,
    scenetaId: 4,
  },
];
const mockAllShows = [
  {
    id: 1,
    nume: "Preșul",
    autor: "Aureșcu Elyndra",
    gen: "dramă",
    descriere:
      '"Piesa de teatru "Preșul" este o dramă puternică și emoționantă despre un grup de femei dintr-un sat îndepărtat care luptă să supraviețuiască în timpul unei secete severe',
    pret_bilet: 50,
    imgPoster:
      "https://www.cnmv.ro/wp-content/uploads/2020/06/orpheus_2019-2020_presul-1024x767.png",
    nr_locuri_totale: null,
    locuri_ocupate:
      '["D9","D10","D11","E9","E10","G8","G7","G6","G5","G4","F7","F8","G10","G11","G12","G13"]',
    createdAt: "2023-05-10T16:12:52.000Z",
    updatedAt: "2023-05-19T10:35:16.000Z",
    trupaId: 1,
    locatieId: 2,
  },
  {
    id: 4,
    nume: "dsad",
    autor: "sadsa",
    gen: "asdsa",
    descriere: "sdadsa",
    pret_bilet: 100,
    imgPoster: "sda",
    nr_locuri_totale: null,
    locuri_ocupate: '["G13","G12","F12","F13"]',
    createdAt: "2023-05-11T09:07:09.000Z",
    updatedAt: "2023-05-19T10:34:16.000Z",
    trupaId: 3,
    locatieId: 3,
  },
  {
    id: 5,
    nume: "Bugi",
    autor: "Dita",
    gen: "drama",
    descriere: "O sceneta superba realizate de catre Dita Alexandru",
    pret_bilet: 100,
    imgPoster:
      "https://th.bing.com/th/id/OIP.rqg-taeHtXJmWjv0VaFDTwHaKx?pid=ImgDet&rs=1",
    nr_locuri_totale: null,
    locuri_ocupate: "[]",
    createdAt: "2023-05-14T19:30:35.000Z",
    updatedAt: "2023-05-14T19:30:35.000Z",
    trupaId: 4,
    locatieId: 1,
  },
];

export function Homepage() {
  // if (!localStorage.getItem("id")) navigate("/");

  const [allShows, setAllShows] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [showMyShows, setShowMyShows] = useState("all-shows");
  const [myShows, setMyShows] = useState([]);
  const [initialTickets, setInitialTickets] = useState([]);
  const navigate = useNavigate();
  const navigateToInscriere = () => navigate("/inscriere");
  const navigateToCalendar = () => navigate("/calendar");

  useEffect(() => {
    axios.get("http://localhost:8080/api/sceneta").then((res) => {
      setAllShows(res.data);
    });
    axios.get("http://localhost:8080/api/trupa").then((res) => {
      setAllTeams(res.data);
    });
    axios.get("http://localhost:8080/api/locatie").then((res) => {
      setAllLocations(res.data);
    });

    axios.get("http://localhost:8080/api/utilizator/bilete").then((res) => {
      console.log(localStorage.getItem("id"));
      console.log(res.data);
      setInitialTickets(res.data);

      console.log(myShows);
    });
  }, []);

  useEffect(() => {
    const finalshows = initialTickets
      .filter((el) => el.utilizatorId == localStorage.getItem("id"))
      .map((el) => {
        return {
          ...allShows.find((el2) => {
            console.log("hello", el.scenetaId, el2.id);
            return el.scenetaId == el2.id;
          }),
          locurile_mele: el.locuri_rezervate,
        };
      });
    setMyShows(finalshows);
  }, [allShows, initialTickets]);

  return (
    <div>
      <React.Fragment>
        <Navbar></Navbar>
      </React.Fragment>

      <div
        style={{
          width: "25%",
          margin: "auto",
          marginTop: 25,
          fontFamily: "Montserrat",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ borderRadius: 20, backgroundColor: "#3f51b5" }}
          onClick={navigateToInscriere}
        >
          Înscrie-ți trupa la festival
        </Button>
      </div>

      <div
        style={{
          width: "25%",
          margin: "auto",
          marginTop: 25,
          fontFamily: "Montserrat",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ borderRadius: 20, backgroundColor: "#3f51b5" }}
          onClick={navigateToCalendar}
        >
          calendar scenete
        </Button>
      </div>

      <div
        className={"page"}
        style={{
          marginTop: 40,
          fontFamily: "Montserrat",
        }}
      >
        <ToggleButtonGroup
          style={{
            marginBottom: 25,
          }}
          color="primary"
          value={showMyShows}
          exclusive
          onChange={(e, asig) => {
            setShowMyShows(asig);
          }}
          aria-label="Platform"
        >
          <ToggleButton value="all-shows">All shows</ToggleButton>
          <ToggleButton value="my-shows">My shows</ToggleButton>
        </ToggleButtonGroup>

        <div className={"shows-container"}>
          <ControlledAccordions
            allTeams={allTeams}
            allLocations={allLocations}
            shows={showMyShows === "all-shows" ? allShows : myShows}
            setMyShows={setMyShows}
            showMyShows={showMyShows}
          />
        </div>
      </div>
    </div>
  );
}
