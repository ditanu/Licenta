import React, { useState, useEffect } from "react";
import "../index.css";

import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

function AdaugareFeedback() {
  const [sceneta, setSceneta] = useState([
    {
      value: "default",
      label: "Alege o opțiune",
    },
  ]);

  const [sceneteValide, setSceneteValide] = useState([
    {
      value: "default",
      label: "Alege o opțiune",
    },
  ]);

  const [initialTickets, setInitialTickets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/sceneta").then((res) => {
      const rawScenete = res.data;
      const sceneteArray = rawScenete?.map((rawOneSceneta) => {
        return {
          value: rawOneSceneta.id,
          label: rawOneSceneta.nume,
        };
      });
      sceneteArray.unshift(sceneta[0]);
      setSceneta(sceneteArray);
    });

    axios.get("http://localhost:8080/api/utilizator/bilete").then((res) => {
      console.log(localStorage.getItem("id"));
      console.log(res.data);
      setInitialTickets(res.data);
    });
  }, []);

  useEffect(() => {
    const temp = sceneta.filter((el) => {
      console.log(
        "plm",
        initialTickets.find((el2) => el2.scenetaId === el.value)
      );
      return (
        el.value ===
        initialTickets.find((el2) => el2.scenetaId === el.value)?.scenetaId
      );
    });
    setSceneteValide(temp);
    console.log("temp", temp);
  }, [initialTickets, sceneta]);

  const [state, setState] = useState({
    observatii: "",
    notaSceneta: null,
    email: "",
    scenetaId: null,
  });

  const sendData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/feedback", {
      observatii: state.observatii,
      notaSceneta: state.notaSceneta,
      email: "dada",
      scenetaId: state.scenetaId,
    });

    toast.success("Feedback adăugat cu succes!");
  };

  return (
    <div>
      <Navbar />
      <div>
        <ToastContainer autoClose={2000} />
        <Typography
          style={{ marginTop: 25, marginBottom: 25 }}
          gutterBottom
          variant="h3"
          align="center"
        >
          Adăugare feedback
        </Typography>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "30px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <form>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      type="name"
                      label="Sceneta"
                      variant="outlined"
                      fullWidth
                      required
                      select
                      defaultValue="default"
                      onChange={(e) => {
                        setState({ ...state, scenetaId: e.target.value });
                      }}
                    >
                      {sceneteValide?.map((e) => {
                        return (
                          <MenuItem key={e.value} value={e.value}>
                            {e.label}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      InputProps={{
                        inputProps: {
                          min: 1,
                          max: 5,
                          step: 1,
                        },
                      }}
                      placeholder="Introduce nota scenetei"
                      label="Nota scenetei (1 - 5)"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setState({ ...state, notaSceneta: +e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Observații scenetă"
                      multiline
                      rows={4}
                      placeholder="Introdu observațiile scenetei"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setState({ ...state, observatii: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={sendData}
                    >
                      Trimite
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </div>
  );
}

export default AdaugareFeedback;
