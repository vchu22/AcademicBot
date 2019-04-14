import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const StudentInfo = props => {
  let info = {
    firstname: 'Cody',
    lastname: 'Smith',
    major: 'Computer Science',
    gpa: 3.4,
    coursesTaken: ['CS101', 'CS201', 'CS202'],
    coursesTaking: ['CS203', 'ENG106', 'MATH201']
  }
  return (
    <div className="content">
      <h3>{info.firstname + ' ' + info.lastname}</h3>
      <p>GPA: {info.gpa}</p>
      <p>Courses Taken</p>
      <ul>
        {info.coursesTaken.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
      <p>Courses Taking</p>
      <ul>
        {info.coursesTaking.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  )
}
