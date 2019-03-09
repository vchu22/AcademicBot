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
      <h3>Welcome, {firstname}</h3>
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
