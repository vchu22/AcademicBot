import axios from 'axios'

// ACTION TYPES
const GOT_APPOINTMENTS = 'GOT_APPOINTMENTS'

// INITIAL STATE
const defaultAppointments = []

// ACTION CREATORS
const getAppointments = appointments => ({type: GOT_APPOINTMENTS, appointments})

// THUNK CREATORS
export const fetchAppointmentsFromServer = studentId => async dispatch => {
  try {
    const res = await axios.get(`/api/students/${studentId}/appointments`)
    dispatch(getAppointments(res.data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = defaultAppointments, action) {
  switch (action.type) {
    case GOT_APPOINTMENTS:
      return action.appointments
    default:
      return state
  }
}
