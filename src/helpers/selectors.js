
export function getAppointmentsForDay(state, day) {

  const foundDay = state.days.find(appts => appts.name === day)
  
  if(!foundDay) {
    return []
  }

  return foundDay.appointments.map(num => state.appointments[num])
}

export function getInterview(state, interview) {

  if (interview && interview.interviewer) {
    return {...interview,
    interviewer: state.interviewers[interview.interviewer]}
  }
 
  return null
}


export function getInterviewersForDay(state, day) {

  const foundDay = state.days.find(appts => appts.name === day)
  
  if(!foundDay) {
    return []
  }

  return foundDay.interviewers.map(num => state.interviewers[num])
}
