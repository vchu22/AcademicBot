const router = require('express').Router()
module.exports = router

router.post('/', (req, res, next) => {
  console.log(req.body)
})
