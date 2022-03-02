import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData () {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
});
  
  
  
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

      const countSpots = (state, day) => {
        let spot = day.spot
        console.log(spot)
        const currentDay = state.days.find((dayItem) => dayItem.name === day);
        const appointmentIds = currentDay.appointments;
      
        const interviewsForTheDay = appointmentIds.map(
          (id) => state.appointments[id].interview
        );
      
        const emptyInterviewsForTheDay = interviewsForTheDay.filter((interview) => !interview);
        const spots = emptyInterviewsForTheDay.length;
      
        return spots;
      };

      return { bookInterview, cancelInterview, state, setDay }
}