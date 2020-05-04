import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MessagePageMain from './MessagePageMain'

describe(`MessagePageMain component`, () => {
  it('renders a .MessagePageMain by default', () => {
    const wrapper = shallow(<MessagePageMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  // enzyme doesn't yet support React.createContext
  it.skip('renders a Message with message prop', () => {
    const props = {
      match: {
        params: {
          messageId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }
    const context = {
      messages: [{
        id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
        name: `Dogs`,
        modified: `2019-01-03T00:00:00.000Z`,
        // memberid: b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1,
        content: "Corporis accusamus placeat.\n \rUnde."
      }]
    }
    const message = shallow(<MessagePageMain {...props} />, context)
      .find('Message')
    expect(toJson(message)).toMatchSnapshot()
  })

  // enzyme doesn't yet support React.createContext
  it.skip(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    const props = {
      match: {
        params: {
          messageId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }

    const messagesContextWithDifferentContent = [
      {
        messages: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n r.\n \rafter n r.",
          }
        ]
      },
      {
        messages: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n.\nafter."
          }
        ]
      }
    ]

    messagesContextWithDifferentContent.forEach(context => {
      const content = shallow(<MessagePageMain {...props} />, context)
        .find('MessagePageMain__content')
      expect(toJson(content)).toMatchSnapshot()
    })
  })
})