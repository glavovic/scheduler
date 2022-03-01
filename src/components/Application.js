import React, { useState } from "react";
import DayList from "./DayList";
import "styles/Application.scss";
import "components/Appointment"
import Appointment from "components/Appointment";
import axios from "axios";
import { useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const interviewersForDay = getInterviewersForDay(state, state.day)
  const appointments = getAppointmentsForDay(state, state.day)

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(response => {
      setState(prev => ({...prev, appointments})
    )})
  };
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment

    };

    setState({
      ...state,
      appointments
    });

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState(prev => ({...prev, appointments})
      )})
      // .catch(err => console.log(err))
  };


  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
      setState(prev => (
        {...prev, 
          days: response[0].data,  
          appointments: response[1].data,
          interviewers: response[2].data,
        }))
    })
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
