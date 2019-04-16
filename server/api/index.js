const router = require('express').Router()
module.exports = router

router.use('/students', require('./students'))
router.use('/appointments', require('./appointments'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
