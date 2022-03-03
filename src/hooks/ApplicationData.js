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
  
  
/* function to save the interview to the database 
and remove a spot from the daylist*/

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
      setState(prev => (
        {...prev,
          appointments,
          days: prev.days.map(day => day.appointments.includes(id) ? {...day, spots: day.spots - 1} : day)
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
        setState(prev => ({...prev, 
          appointments,
          days: prev.days.map(day => day.appointments.includes(id) ? {...day, spots: day.spots + 1} : day)
        })
        )
      })
        // .catch(err => console.log(err))
      };

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
        // .catch(err => console.log({ err }))
      }, []);


      return { bookInterview, cancelInterview, state, setDay, editInterview}
}