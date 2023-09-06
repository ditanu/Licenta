import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../index.css";

export default function ControlledAccordions({
  shows,
  setMyShows,
  showMyShows,
  allTeams,
  allLocations,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addToMyShow = (el) => {
    setMyShows((prev) => [...prev, el]);
    localStorage.setItem("piesa_id", el.id);
    navigate("/alegereLocuri");
  };

  console.log("shows", shows);
  const locuriRamase = (show) => {
    return (
      allLocations.find((el) => el.id == show.locatieId)?.nrLocuri -
      JSON.parse(show.locuri_ocupate).length
    );
  };

  console.log(allLocations);
  return (
    <div style={{ width: "100%", fontFamily: "Montserrat" }}>
      {shows.map((el) => (
        <Accordion
          expanded={expanded === `panel${el.id}`}
          onChange={handleChange(`panel${el.id}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Piesa {el.nume}
            </Typography>
            {locuriRamase(el) <= 5 && (
              <Typography sx={{ width: "33%", flexShrink: 0, color: "red" }}>
                Mai sunt {locuriRamase(el)} locuri
              </Typography>
            )}
            <Typography sx={{ color: "text.secondary" }}>
              {allTeams.find((el2) => el2.id === el.trupaId)?.nume}
            </Typography>
            {el.locurile_mele && (
              <Typography sx={{ color: "text.secondary" }}>
                {JSON.parse(el.locurile_mele).map((el2) => (
                  <span style={{ color: "#3F51B5", fontWeight: "bold" }}>
                    &nbsp; {el2}
                  </span>
                ))}
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: "flex", height: "70vh" }}>
              <img
                style={{
                  width: "28vw",
                  aspectRatio: "1/2",
                  marginRight: "5rem",
                }}
                src={el.imgPoster}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  alignItems: "center",
                  gap: "1rem",
                  height: "100%",
                }}
                className={"show-description"}
              >
                <Typography sx={{ fontSize: "1.2rem" }}>
                  {el.descriere}
                  {/* Praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occ
                                    is praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat." */}
                </Typography>
                <div
                  className={"piesa-detalii"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end",
                    textAlign: "center",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ fontWeight: "700", fontSize: "2rem" }}>
                      {el.autor}
                    </Typography>
                    <Typography sx={{ fontWeight: "600", fontSize: "1.5rem" }}>
                      Gen {el.gen}
                    </Typography>
                    <Typography sx={{ fontWeight: "600", fontSize: "1.3rem" }}>
                      {
                        allLocations.find((el2) => el2.id === el.locatieId)
                          ?.nume
                      }
                    </Typography>
                    <Typography sx={{ fontWeight: "600", fontSize: "1.5rem" }}>
                      {el.data} {el.ora}
                    </Typography>{" "}
                    <Typography sx={{ fontWeight: "600", fontSize: "1.5rem" }}>
                      Preț {el.pret_bilet} lei
                    </Typography>{" "}
                  </div>
                </div>
                <Button
                  style={{
                    justifySelf: "flex-end",
                    marginBottom: "3rem",
                    backgroundColor: "#3f51b5",
                    color: "white",
                    fontWeight: "500",
                    borderRadius: "0.5rem",
                  }}
                  onClick={() => {
                    addToMyShow(el);
                  }}
                >
                  {" "}
                  Cumpăra bilet{" "}
                </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
