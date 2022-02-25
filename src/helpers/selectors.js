import axios from "axios"
import DayList from "components/DayList"

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const dailyAppointments = []
  state.days.filter(stateDay => {
    if(stateDay.name === day) {
      stateDay.appointments.filter(id =>{
        dailyAppointments.push(state.appointments[id])
      })
    }
  })

  return dailyAppointments
}

