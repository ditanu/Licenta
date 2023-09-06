import { React, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

//localhost:8080/api/locatie
function AdaugareSceneta() {
  const [location, setLocation] = useState([
    {
      value: "default",
      label: "Alege o opțiune",
    },
  ]);
  const [trupa, setTrupa] = useState([
    {
      value: "default",
      label: "Alege o opțiune",
      activ: true,
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/locatie").then((res) => {
      const rawLocations = res.data;
      const locationArray = rawLocations?.map((rawOneLocation) => {
        return {
          value: rawOneLocation.id,
          label: rawOneLocation.nume,
        };
      });
      locationArray.unshift(location[0]);
      setLocation(locationArray);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/trupa").then((res) => {
      const rawTrupe = res.data;
      const trupeArray = rawTrupe?.map((rawOneTrupa) => {
        return {
          value: rawOneTrupa.id,
          label: rawOneTrupa.nume,
          activ: rawOneTrupa.active,
        };
      });
      trupeArray.unshift(trupa[0]);
      setTrupa(trupeArray);
    });
  }, []);

  const [state, setState] = useState({
    nume: "",
    autor: "",
    gen: "",
    descriere: "",
    pret_bilet: "",
    imgPoster: "",
    data: "",
    ora: "",
    trupaId: null,
    locatieId: null,
  });

  const sendData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/sceneta", {
      nume: state.nume,
      autor: state.autor,
      gen: state.gen,
      descriere: state.descriere,
      pret_bilet: state.pret_bilet,
      imgPoster: state.imgPoster,
      data: state.data,
      ora: state.ora,
      trupaId: state.trupaId,
      locatieId: state.locatieId,
    });

    toast.success("Scenetă adăugată cu succes!");
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
          Adăugare scenetă
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
                      placeholder="Introduce numele scenetei"
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
                      type="name"
                      placeholder="Introduce numele autorului"
                      label="Autor"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, autor: e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="name"
                      placeholder="Introduce genul scenetei"
                      label="Gen"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, gen: e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="name"
                      placeholder="Introduce un url pentru posterul scenetei"
                      label="Poster Scenetă"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, imgPoster: e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="name"
                      // placeholder="Alege locația scenetei"
                      label="Locația"
                      variant="outlined"
                      fullWidth
                      required
                      select
                      defaultValue="default"
                      onChange={(e) => {
                        setState({ ...state, locatieId: e.target.value });
                      }}
                    >
                      {location?.map((place) => {
                        return (
                          <MenuItem key={place.value} value={place.value}>
                            {place.label}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="name"
                      label="Trupa"
                      variant="outlined"
                      fullWidth
                      required
                      select
                      defaultValue="default"
                      onChange={(e) => {
                        setState({ ...state, trupaId: e.target.value });
                      }}
                    >
                      {trupa
                        ?.filter((e) => e.activ === true)
                        .map((e) => {
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
                      placeholder="Introduce prețul biletului"
                      label="Preț bilet"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, pret_bilet: +e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="name"
                      placeholder="Introduce data scenetei"
                      label="Data Scenetă"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, data: e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="name"
                      placeholder="Introduce ora scenetei"
                      label="Ora Scenetă"
                      variant="outlined"
                      onChange={(e) => {
                        setState({ ...state, ora: e.target.value });
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Descriere scenetă"
                      multiline
                      minRows={4}
                      placeholder="Introduce descrierea scenetei"
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

export default AdaugareSceneta;
