import React, { useState, useRef } from "react";

import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

function AdaugareLocatie() {
  const [state, setState] = useState({ name: "", number: null, street: "" });

  const sendData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/locatie", {
      nume: state.name,
      nrLocuri: state.number,
      strada: state.street,
    });
    toast.success("Locație adăugată cu succes!");
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
          Adăugare locație
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
                      value={state.name}
                      type="name"
                      placeholder="Introduce numele locației"
                      label="Nume"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, name: e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={state.number}
                      type="number"
                      placeholder="Introduce numărul de locuri disponibil"
                      label="Număr locuri"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, number: +e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={state.street}
                      label="Strada locației"
                      placeholder="Introduce locația"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, street: e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={sendData}
                      fullWidth
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

export default AdaugareLocatie;
