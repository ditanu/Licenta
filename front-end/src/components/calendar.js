import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = (props) => {
  const [myEvents, setMyEvents] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/sceneta").then((res) => {
      setMyEvents(
        res.data.map((el) => {
          console.log("data", el.data);
          return {
            start: el.data,
            end: el.data,
            eventClasses: "optionalEvent",
            title: el.nume,
            description: el.descriere,
            data: "you can add what ever random data you may want to use later",
          };
        })
      );
    });
  }, []);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{
          width: "90%",
          padding: "0 4.15rem",
          height: "80vh",
          marginTop: "3rem",
          margin: "0 auto",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default MyCalendar;
