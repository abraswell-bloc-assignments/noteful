import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Message from './Message'

describe(`Message component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: new Date(2018, 12, 15),
  }

  it('renders a .Message by default', () => {
    const wrapper = shallow(<Message />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Message given props', () => {
    const wrapper = shallow(<Message {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
