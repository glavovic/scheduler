import React, { useState } from "react";
import DayList from "./DayList";
import "styles/Application.scss";
import "components/Appointment"
import Appointment from "components/Appointment";
import axios from "axios";
import { useEffect } from "react";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  
  const appointments = getAppointmentsForDay(state, state.day)

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  const setDay = day => setState({ ...state, day });

  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(response => {
      console.log("days: ", response[0].data)
      console.log("appointments: ", response[1].data)
      console.log("interviewers: ", response[2].data)

      setState(prev => (
        {...prev, 
          days: response[0].data,  
          appointments: response[1].data,
          interviewers: response[2].data,
        }))
    })
    .catch(err => console.log({ err }))
  }, []);
  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
       />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
