const router = require('express').Router()
const {Student} = require('../db/models')
const {isLoggedIn} = require('../middleware')
module.exports = router

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const students = await Student.findAll({
      // explicitly select only the id and email fields - even though
      // students' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstname', 'lastname', 'gpa']
    })
    res.json(students)
  } catch (err) {
    next(err)
  }
})
