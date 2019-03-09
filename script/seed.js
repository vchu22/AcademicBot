'use strict'

const db = require('../server/db')
const {Student} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const students = await Promise.all([
    Student.create({
      email: 'cody@uni.edu',
      password: '123',
      firstname: 'Cody',
      lastname: 'Smith',
      gpa: 3.4
    }),
    Student.create({
      email: 'murphy@uni.edu',
      password: '123',
      firstname: 'Murphy',
      lastname: 'Jordan',
      gpa: 2.6
    })
  ])

  console.log(`seeded ${students.length} students`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
