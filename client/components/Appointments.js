import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchAppointmentsFromServer} from '../store'

const cleanDateTimeString = str =>
  str
    .substring(0, 16)
    .replace('T', ' ')
    .replace(/-/g, '/')

class Appointments extends Component {
  componentDidMount() {
    this.props.fetchAppointments(this.props.student.id)
    console.log(this.props)
  }
  render() {
    return (
      <div className="content">
        <h2>Here is a list of appointments</h2>
        <table id="appointments">
          <tbody>
            <tr>
              <th>Advisor</th>
              <th>Appointment Time</th>
            </tr>
            {this.props.appointments.map(appt => (
              <tr key={appt.id}>
                <td>{appt.advisor.firstname + ' ' + appt.advisor.lastname}</td>
                <td>{cleanDateTimeString(appt.apptime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    student: state.student,
    appointments: state.appointments
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

Appointments.propTypes = {
  appointments: PropTypes.array
}
