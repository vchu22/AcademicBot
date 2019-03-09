/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './student'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {student: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET STUDENT action', async () => {
      const fakeStudent = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeStudent)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_STUDENT')
      expect(actions[0].student).to.be.deep.equal(fakeStudent)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_STUDENT action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_STUDENT')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
