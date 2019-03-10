module.exports = {
  isLoggedIn: (req, res, next) => {
    // console.log(req)
    if (req.user) {
      next()
    } else {
      let err = new Error('A client hit a route that requires login')
      res.redirect('/login')
      next(err)
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      next()
    } else {
      let err = new Error('A client attempted to access an admin route')
      res.redirect('/login')
      next(err)
    }
  },
  isRightStudent: (req, res, next) => {
    if (
      req.user.id === +req.body.studentId ||
      req.user.id === +req.params.studentId
    ) {
      next()
    } else {
      let err = new Error('User not authorized to request this information') // this error will show up in the server console
      err.status = 401
      res.redirect('/home')
      next(err)
    }
  }
}
