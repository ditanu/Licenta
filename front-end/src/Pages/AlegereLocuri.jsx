import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SeatPicker from "../components/SeatPicker";
import Final from "./Final";
import "./Seats.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AlegereLocuri() {
  const [selected, setSelected] = useState([]);
  console.log("selected,", selected);
  let navigate = useNavigate();
  const [pret, setPret] = useState(0);
  const [numePiesa, setNumePiesa] = useState();
  const [locuriOcupate, setLocuriOcupate] = useState([]);
  const [allSeats, setAllSeats] = useState(100);
  const checkIdReserved = (key) => !!locuriOcupate.find((el) => el === key);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/sceneta/${localStorage.getItem("piesa_id")}`
      )
      .then((res) => {
        console.log("date", res.data);
        console.log("parsare", JSON.parse(res.data.sceneta.locuri_ocupate));
        setPret(res.data.sceneta.pret_bilet);
        setLocuriOcupate(JSON.parse(res.data.sceneta.locuri_ocupate));
        setNumePiesa(res.data.sceneta.nume);
        console.log(res.data.sceneta.nume);
      });
  }, []);

  const rows = useMemo(
    () => [
      [
        { id: 1, number: "A1", isReserved: checkIdReserved("A1") },
        { id: 2, number: "A2", isReserved: checkIdReserved("A2") },
        { id: 3, number: "A3", isReserved: checkIdReserved("A3") },
        { id: 4, number: "A4", isReserved: checkIdReserved("A4") },
        { id: 24, number: "A5", isReserved: checkIdReserved("A5") },
        { id: 34, number: "A6", isReserved: checkIdReserved("A6") },
        { id: 44, number: "A7", isReserved: checkIdReserved("A7") },
        { id: 54, number: "A8", isReserved: checkIdReserved("A8") },
        null,
        { id: 5, number: "A9", isReserved: checkIdReserved("A9") },
        { id: 6, number: "A10", isReserved: checkIdReserved("A10") },
        { id: 7, number: "A11", isReserved: checkIdReserved("A11") },
        { id: 8, number: "A12", isReserved: checkIdReserved("A12") },
        { id: 9, number: "A13", isReserved: checkIdReserved("A13") },
      ],
      [
        { id: 11, number: "B1", isReserved: checkIdReserved("B1") },
        { id: 12, number: "B2", isReserved: checkIdReserved("B2") },
        { id: 13, number: "B3", isReserved: checkIdReserved("B3") },
        { id: 14, number: "B4", isReserved: checkIdReserved("B4") },
        { id: 74, number: "B5", isReserved: checkIdReserved("B5") },
        { id: 84, number: "B6", isReserved: checkIdReserved("B6") },
        { id: 34, number: "B7", isReserved: checkIdReserved("B7") },
        { id: 94, number: "B8", isReserved: checkIdReserved("B8") },
        null,
        { id: 15, number: "B9", isReserved: checkIdReserved("B9") },
        { id: 16, number: "B10", isReserved: checkIdReserved("B10") },
        { id: 17, number: "B11", isReserved: checkIdReserved("B11") },
        { id: 18, number: "B12", isReserved: checkIdReserved("B12") },
        { id: 19, number: "B13", isReserved: checkIdReserved("B13") },
      ],
      [
        { id: 21, number: "C1", isReserved: checkIdReserved("C1") },
        { id: 22, number: "C2", isReserved: checkIdReserved("C2") },
        { id: 23, number: "C3", isReserved: checkIdReserved("C3") },
        { id: 24, number: "C4", isReserved: checkIdReserved("C4") },
        { id: 29, number: "C5", isReserved: checkIdReserved("C5") },
        { id: 20, number: "C6", isReserved: checkIdReserved("C6") },
        { id: 99, number: "C7", isReserved: checkIdReserved("C7") },
        { id: 98, number: "C8", isReserved: checkIdReserved("C8") },
        null,
        { id: 25, number: "C9", isReserved: checkIdReserved("C9") },
        { id: 26, number: "C10", isReserved: checkIdReserved("C10") },
        { id: 27, number: "C11", isReserved: checkIdReserved("C11") },
        { id: 28, number: "C12", isReserved: checkIdReserved("C12") },
        { id: 29, number: "C13", isReserved: checkIdReserved("C13") },
        null,
      ],
      [
        { id: 11, number: "D1", isReserved: checkIdReserved("D1") },
        { id: 12, number: "D2", isReserved: checkIdReserved("D2") },
        { id: 13, number: "D3", isReserved: checkIdReserved("D3") },
        { id: 14, number: "D4", isReserved: checkIdReserved("D4") },
        { id: 74, number: "D5", isReserved: checkIdReserved("D5") },
        { id: 84, number: "D6", isReserved: checkIdReserved("D6") },
        { id: 34, number: "D7", isReserved: checkIdReserved("D7") },
        { id: 94, number: "D8", isReserved: checkIdReserved("D8") },
        null,
        { id: 15, number: "D9", isReserved: checkIdReserved("D9") },
        { id: 16, number: "D10", isReserved: checkIdReserved("D10") },
        { id: 17, number: "D11", isReserved: checkIdReserved("D11") },
        { id: 18, number: "D12", isReserved: checkIdReserved("D12") },
        { id: 19, number: "D13", isReserved: checkIdReserved("D13") },
      ],
      [
        { id: 11, number: "E1", isReserved: checkIdReserved("E1") },
        { id: 12, number: "E2", isReserved: checkIdReserved("E2") },
        { id: 13, number: "E3", isReserved: checkIdReserved("E3") },
        { id: 14, number: "E4", isReserved: checkIdReserved("E4") },
        { id: 74, number: "E5", isReserved: checkIdReserved("E5") },
        { id: 84, number: "E6", isReserved: checkIdReserved("E6") },
        { id: 34, number: "E7", isReserved: checkIdReserved("E7") },
        { id: 94, number: "E8", isReserved: checkIdReserved("E8") },
        null,
        { id: 15, number: "E9", isReserved: checkIdReserved("E9") },
        { id: 16, number: "E10", isReserved: checkIdReserved("E10") },
        { id: 17, number: "E11", isReserved: checkIdReserved("E11") },
        { id: 18, number: "E12", isReserved: checkIdReserved("E12") },
        { id: 19, number: "E13", isReserved: checkIdReserved("E13") },
      ],
      [
        { id: 11, number: "F1", isReserved: checkIdReserved("F1") },
        { id: 12, number: "F2", isReserved: checkIdReserved("F2") },
        { id: 13, number: "F3", isReserved: checkIdReserved("F3") },
        { id: 14, number: "F4", isReserved: checkIdReserved("F4") },
        { id: 74, number: "F5", isReserved: checkIdReserved("F5") },
        { id: 84, number: "F6", isReserved: checkIdReserved("F6") },
        { id: 34, number: "F7", isReserved: checkIdReserved("F7") },
        { id: 94, number: "F8", isReserved: checkIdReserved("F8") },
        null,
        { id: 15, number: "F9", isReserved: checkIdReserved("F9") },
        { id: 16, number: "F10", isReserved: checkIdReserved("F10") },
        { id: 17, number: "F11", isReserved: checkIdReserved("F11") },
        { id: 18, number: "F12", isReserved: checkIdReserved("F12") },
        { id: 19, number: "F13", isReserved: checkIdReserved("F13") },
      ],
      [
        { id: 11, number: "G1", isReserved: checkIdReserved("G1") },
        { id: 12, number: "G2", isReserved: checkIdReserved("G2") },
        { id: 13, number: "G3", isReserved: checkIdReserved("G3") },
        { id: 14, number: "G4", isReserved: checkIdReserved("G4") },
        { id: 74, number: "G5", isReserved: checkIdReserved("G5") },
        { id: 84, number: "G6", isReserved: checkIdReserved("G6") },
        { id: 34, number: "G7", isReserved: checkIdReserved("G7") },
        { id: 94, number: "G8", isReserved: checkIdReserved("G8") },
        null,
        { id: 15, number: "G9", isReserved: checkIdReserved("G9") },
        { id: 16, number: "G10", isReserved: checkIdReserved("G10") },
        { id: 17, number: "G11", isReserved: checkIdReserved("G11") },
        { id: 18, number: "G12", isReserved: checkIdReserved("G12") },
        { id: 19, number: "G13", isReserved: checkIdReserved("G13") },
      ],
    ],
    [locuriOcupate]
  );
  console.log("rows", rows);

  const price = pret;
  const totalprice = price * selected.length;
  const addSeatCallback = ({ row, number, id }, addCb) => {
    setSelected((prevItems) => [...prevItems, number]);
    const newTooltip = `tooltip for id-${id} added by callback`;
    addCb(row, number, id, newTooltip);
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    setSelected((list) => list.filter((item) => item !== number));
    removeCb(row, number);
  };

  const sendSeats = async () => {
    axios.post("http://localhost:8080/api/utilizator/bilet", {
      utilizatorId: localStorage.getItem("id"),
      scenetaId: localStorage.getItem("piesa_id"),
      locuri_rezervate: JSON.stringify(selected),
    });

    axios.put(
      `http://localhost:8080/api/sceneta/${localStorage.getItem("piesa_id")}`,
      {
        locuri_ocupate: JSON.stringify([...locuriOcupate, ...selected]),
      }
    );

    toast.success("Locurile au fost rezervate cu succes!");
    setTimeout(() => {
      navigate("/homepage");
    }, 1500);
  };

  return (
    <div>
      <ToastContainer autoClose={1500} />

      <Navbar></Navbar>
      <div className="seats" style={{ marginTop: 35 }}>
        <h1 className="nume-piesa"> {numePiesa}</h1>
        {locuriOcupate.length && (
          <SeatPicker
            addSeatCallback={addSeatCallback}
            removeSeatCallback={removeSeatCallback}
            rows={rows}
            alpha
            maxReservableSeats={10}
            visible
          />
        )}
        {locuriOcupate.length === 0 && (
          <SeatPicker
            addSeatCallback={addSeatCallback}
            removeSeatCallback={removeSeatCallback}
            rows={rows}
            alpha
            maxReservableSeats={10}
            visible
          />
        )}
        {selected.length !== 0 ? (
          <>
            <div className="seat-price">
              <div className="seat-select">
                <h1 className="seats-select">Locuri : {selected.toString()}</h1>
              </div>
              <div className="totalprice">
                <h1 className="price">{totalprice} lei</h1>
              </div>
            </div>
            <button className="continue" onClick={sendSeats}>
              Achiziționează
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
