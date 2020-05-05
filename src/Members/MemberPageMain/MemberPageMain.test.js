import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MemberPageMain from './MemberPageMain'

describe(`MemberPageMain component`, () => {
  it('renders a .MemberPageMain by default', () => {
    const wrapper = shallow(<MemberPageMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  // enzyme doesn't yet support React.createContext
  it.skip('renders a Member with member prop', () => {
    const props = {
      match: {
        params: {
          memberId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }
    const context = {
      members: [{
        id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
        name: `Dogs`,
        modified: `2019-01-03T00:00:00.000Z`,
        // memberid: b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1,
        content: "Corporis accusamus placeat.\n \rUnde."
      }]
    }
    const member = shallow(<MemberPageMain {...props} />, context)
      .find('Member')
    expect(toJson(member)).toMatchSnapshot()
  })

  // enzyme doesn't yet support React.createContext
  it.skip(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    const props = {
      match: {
        params: {
          memberId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }

    const membersContextWithDifferentContent = [
      {
        members: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n r.\n \rafter n r.",
          }
        ]
      },
      {
        members: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n.\nafter."
          }
        ]
      }
    ]

    membersContextWithDifferentContent.forEach(context => {
      const content = shallow(<MemberPageMain {...props} />, context)
        .find('MemberPageMain__content')
      expect(toJson(content)).toMatchSnapshot()
    })
  })
})