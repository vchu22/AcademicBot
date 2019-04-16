const router = require('express').Router()
const {Appointment, Advisor} = require('../db/models')
const {isLoggedIn, isRightStudent} = require('../middleware')
module.exports = router

router.get(
  '/:studentId',
  isLoggedIn,
  isRightStudent,
  async (req, res, next) => {
    try {
      const studentId = req.params.studentId
      const appts = await Appointment.findAll({
        where: {
          studentId
        },
        include: [{model: Advisor}]
      })
      res.json(appts)
    } catch (err) {
      next(err)
    }
  }
)
