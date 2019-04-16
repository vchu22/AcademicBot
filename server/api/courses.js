const router = require('express').Router()
const {TakenCourse, Course} = require('../db/models')
const {isLoggedIn, isRightStudent} = require('../middleware')
module.exports = router

router.get(
  '/taken/:studentId',
  isLoggedIn,
  isRightStudent,
  async (req, res, next) => {
    try {
      const studentId = req.params.studentId
      const takenCourses = await TakenCourse.findAll({
        where: {
          studentId
        },
        include: [{model: Course}]
      })
      res.json(takenCourses)
    } catch (err) {
      next(err)
    }
  }
)
