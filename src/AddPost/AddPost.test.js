import React from 'react';
import { Route } from 'react-router-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddPost from './AddPost'

describe(`AddPost component`, () => {
  const stubMembers = [
    {
      "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Important"
    },
    {
      "id": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Super"
    },
    {
      "id": "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Spangley"
    }
  ]

  it('renders the complete form', () => {
    const wrapper = shallow(<Route path='/add-post' component={AddPost} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  // enzyme doesn't support React.createContext
  it.skip('renders the select options from members', () => {
    const context = { members: stubMembers }
    const select = shallow(<Route path='/add-post' component={AddPost} />, context)
      .find('#post-member-select')
    expect(toJson(select)).toMatchSnapshot()
  })
})