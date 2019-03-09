/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Student = db.model('student')

describe('Student routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/students/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Student.create({
        email: codysEmail
      })
    })

    it('GET /api/students', async () => {
      const res = await request(app)
        .get('/api/students')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  })
})
