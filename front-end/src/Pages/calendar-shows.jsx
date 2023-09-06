import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MyCalendar from "../components/calendar";

export const CalendarPage = () => {
    return (<div>
        <Navbar></Navbar>
        <MyCalendar/>
    </div>)
}
