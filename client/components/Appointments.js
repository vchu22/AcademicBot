import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchAppointmentsFromServer} from '../store'

/**
 * COMPONENT
 */
const Appointments = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="content">
      <h2>Here is a list of appointments</h2>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapState = state => {
  return {
    appointments: state.student.appointments
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAppointments(studentId) {
      dispatch(fetchAppointmentsFromServer(studentId))
    }
  }
}

export default connect(mapState, mapDispatch)(Appointments)

/**
 * PROP TYPES
 */
Appointments.propTypes = {
  appointments: PropTypes.array
}
