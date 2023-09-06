import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

function InscriereTrupa() {
  // if (!localStorage.getItem("id")) navigate("/");

  const [state, setState] = useState({
    nume: "",
    nrMembrii: null,
    descriere: "",
    utilizatorId: null,
  });
  const sendData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/trupa", {
      nume: state.nume,
      nrMembrii: state.nrMembrii,
      descriere: state.descriere,
      utilizatorId: localStorage.getItem("id"),
    });

    toast.success("Trupă adăugată cu succes!");
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
          Înscriere Trupă
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
                      label="Nume"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, nume: e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      placeholder="Introduce numărul de membrii"
                      label="Număr membrii"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, nrMembrii: +e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Descriere trupei"
                      multiline
                      minRows={4}
                      placeholder="Introduce descrierea trupei"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, descriere: e.target.value });
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
                      style={{ backgroundColor: "#3f51b5" }}
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

export default InscriereTrupa;
