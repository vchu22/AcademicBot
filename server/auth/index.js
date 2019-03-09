const router = require('express').Router()
const Student = require('../db/models/student')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const student = await Student.findOne({where: {email: req.body.email}})
    if (!student) {
      console.log('No such student found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!student.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(student, err => (err ? next(err) : res.json(student)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const student = await Student.create(req.body)
    req.login(student, err => (err ? next(err) : res.json(student)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.student)
})

router.use('/google', require('./google'))
