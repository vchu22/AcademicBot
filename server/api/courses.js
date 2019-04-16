const router = require('express').Router()
const {CourseHistory, Course} = require('../db/models')
const {isLoggedIn, isRightStudent} = require('../middleware')
module.exports = router

router.get(
  '/:studentId',
  isLoggedIn,
  isRightStudent,
  async (req, res, next) => {
    try {
      const studentId = req.params.studentId
      const courseHistory = await CourseHistory.findAll({
        where: {
          studentId
        },
        include: [{model: Course}]
      })
      res.json(courseHistory)
    } catch (err) {
      next(err)
    }
  }
)
