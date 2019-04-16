import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCourseHistoryFromServer} from '../store'

class StudentInfo extends Component {
  componentDidMount() {
    this.props.fetchCoursesTaken(this.props.student.id)
  }
  render() {
    const coursesTaken = this.props.courses.filter(
        course => course.status === 'TAKEN'
      ),
      coursesTaking = this.props.courses.filter(
        course => course.status === 'TAKING'
      )
    return (
      <div className="content">
        <h3>
          {this.props.student.firstname + ' ' + this.props.student.lastname}
        </h3>
        <p>GPA: {this.props.student.gpa}</p>
        <p>Courses Taken</p>
        <table id="courses-taken">
          <tbody>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Term</th>
              <th>Grade</th>
            </tr>
            {coursesTaken.map((course, index) => (
              <tr key={index}>
                <td>{course.course.coursecode}</td>
                <td>{course.course.coursename}</td>
                <td>{course.term + ' ' + course.year}</td>
                <td>{toLetterGrade(course.grade)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Courses Taking</p>
        <table id="courses-taking">
          <tbody>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Term</th>
            </tr>
            {coursesTaking.map((course, index) => (
              <tr key={index}>
                <td>{course.course.coursecode}</td>
                <td>{course.course.coursename}</td>
                <td>{course.term + ' ' + course.year}</td>
                <td>{course.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const toLetterGrade = num => {
  const x = num
  switch (true) {
    case 97 <= x && x <= 100:
      return 'A+'
    case 94 <= x && x <= 96:
      return 'A'
    case 90 <= x && x <= 93:
      return 'A-'
    case 87 <= x && x <= 89:
      return 'B+'
    case 84 <= x && x <= 86:
      return 'B'
    case 80 <= x && x <= 83:
      return 'B-'
    case 77 <= x && x <= 79:
      return 'C+'
    case 74 <= x && x <= 76:
      return 'C'
    case 70 <= x && x <= 73:
      return 'C-'
    case 67 <= x && x <= 69:
      return 'D+'
    case 64 <= x && x <= 66:
      return 'D'
    case 60 <= x && x <= 63:
      return 'D-'
    case x <= 59:
      return 'F'
    default:
      return ''
  }
}

const mapState = state => {
  return {
    student: state.student,
    courses: state.courses
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCoursesTaken(studentId) {
      dispatch(fetchCourseHistoryFromServer(studentId))
    }
  }
}

export default connect(mapState, mapDispatch)(StudentInfo)

StudentInfo.propTypes = {
  student: PropTypes.object,
  courses: PropTypes.array
}
