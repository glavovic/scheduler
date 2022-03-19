import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData () {

// states that get passed down
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
});

const setDay = day => setState({ ...state, day });
  
// get requests for each state
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
  
/* function to save the interview to the database 
and remove a spot from the daylist*/

const remainingSpots = (appointments, days) => {
  let appointmentsId = [];
  let count = 0;
  //loop over days
  const spots = days.map((day) => {
    //if day name is equal to the state day
    if (day.name === state.day) {
      //push appointments into the appointmentsId array
      appointmentsId = day.appointments;
      for (let key in appointments) {
        const remainingAppointment = appointments[key];
        // if appointments Id included the key of appointments and it is equal to null increase the count of remaining spots
        if (appointmentsId.includes(remainingAppointment.id)) {
          if (remainingAppointment.interview === null) {
            count++;
          }
        }
      }
      day.spots = count;
    }
    return day;
  });

  return spots;
};
// .catch(err => console.log({ err }))



 function bookInterview(id, interview) {
    
   
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const availableSpots = remainingSpots(appointments, state.days)
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(response => {
      setState(prev => (
        {...prev,
          appointments,
          days: availableSpots
        })
      )})
  };
    
// function to edit the interview in the database
  function editInterview(id, interview) {
    
   
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
      setState(prev => (
        {...prev,
          appointments,
        })
      )})
  };
// function to remove the interview from the database and add a spot
  function cancelInterview(id) {
    //get all existing appointments
    const appointments = {
      ...state.appointments,
    };
    // change the interview state to null
    appointments[id].interview = null;
    const availableSpots = remainingSpots(appointments, state.days);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: availableSpots,
      });
    });
  };
      
      return { bookInterview, cancelInterview, state, setDay, editInterview}
}