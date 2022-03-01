
export function getAppointmentsForDay(state, day) {

  const appointments = []
  state.days.filter(stateDay => {
    if(stateDay.name === day) {
      stateDay.appointments.filter(id => {
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


export function getInterviewersForDay(state, day) {

  const interviwersArr = []
  state.days.filter(stateDay => {
    if(stateDay.name === day) {
      stateDay.interviewers.filter(e =>{
        interviwersArr.push(state.interviewers[e])
      })
    }
  })

  return interviwersArr
}
