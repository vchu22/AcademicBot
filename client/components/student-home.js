import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const StudentHome = props => {
  const {firstname} = props

  return (
    <div>
      <h3>
        Welcome to Academic Advising Center, {firstname}. Here you can ask the
        chatbot about academic related questions or set up an appointment with
        an academic advisor.
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstname: state.student.firstname
  }
}

export default connect(mapState)(StudentHome)

/**
 * PROP TYPES
 */
StudentHome.propTypes = {
  email: PropTypes.string
}
