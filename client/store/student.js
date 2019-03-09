import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_STUDENT = 'GET_STUDENT'
const REMOVE_STUDENT = 'REMOVE_STUDENT'

/**
 * INITIAL STATE
 */
const defaultStudent = {}

/**
 * ACTION CREATORS
 */
const getStudent = student => ({type: GET_STUDENT, student})
const removeStudent = () => ({type: REMOVE_STUDENT})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getStudent(res.data || defaultStudent))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getStudent({error: authError}))
  }

  try {
    dispatch(getStudent(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeStudent())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultStudent, action) {
  switch (action.type) {
    case GET_STUDENT:
      return action.student
    case REMOVE_STUDENT:
      return defaultStudent
    default:
      return state
  }
}
