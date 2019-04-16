import axios from 'axios'

// ACTION TYPES
const GOT_COURSE_HISTORY = 'GOT_COURSE_HISTORY'

// INITIAL STATE
const defaultCourses = []

// ACTION CREATORS
const getCourseHistory = courses => ({type: GOT_COURSE_HISTORY, courses})

// THUNK CREATORS
export const fetchCourseHistoryFromServer = studentId => async dispatch => {
  try {
    const res = await axios.get(`/api/courses/${studentId}`)
    dispatch(getCourseHistory(res.data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = defaultCourses, action) {
  switch (action.type) {
    case GOT_COURSE_HISTORY:
      return action.courses
    default:
      return state
  }
}
