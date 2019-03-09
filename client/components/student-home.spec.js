/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {StudentHome} from './student-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('StudentHome', () => {
  let studentHome

  beforeEach(() => {
    studentHome = shallow(<StudentHome email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(studentHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
