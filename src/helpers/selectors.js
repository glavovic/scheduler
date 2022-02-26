import Appointment from "components/Appointment"

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const appointments = []
  state.days.filter(stateDay => {
    if(stateDay.name === day) {
      stateDay.appointments.filter(id =>{
        appointments.push(state.appointments[id])
      })
    }
  })

  return appointments
}

export function getInterview(state, interview) {

  if (interview && interview.interviewer) {
    return {...interview,
    interviewer: state.interviewers[interview.interviewer]}
  }
 
  return null
}
