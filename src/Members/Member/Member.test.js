import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
impoMember from './Member'

describe(`Member component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: new Date(2018, 12, 15),
  }

  it('renders a .Member by default', () => {
    const wrapper = shallow(<Member />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Member given props', () => {
    const wrapper = shallow(<Member {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
