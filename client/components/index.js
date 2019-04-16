/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as StudentHome} from './StudentHome'
export {Login, Signup} from './AuthForm'
export {default as StudentInfo} from './StudentInfo'
export {default as Appointments} from './Appointments'
