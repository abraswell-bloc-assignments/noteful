import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import MessagePageNav from './MessagePageNav'

it('renders without crashing', () => {

  const div = document.createElement('div')
  ReactDOM.render(<MessagePageNav />, div)
  ReactDOM.unmountComponentAtNode(div)
  })

describe(`MessagePageNav component`, () => {
  it('renders a .MessagePageNav by default', () => {
    const wrapper = renderer
    .create(<MessagePageNav />)
    .toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it.skip('renders a h3 with member name when in props', () => {
    const props = {
      match: {
        params: {
          messageId: 'test-message-id'
        }
      }
    }
    const context = {
      messages: [{ id: 'test-message-id', memberid: 'test-member-id' }],
      members: [{ id: 'test-member-id', name: 'Important' }]
    }

    const h3 = renderer
    .create(<MessagePageNav {...props} />, context)
    .find('.MessagePageNav__member-name')
    .toJSON()
    expect(h3).toMatchSnapshot()
  })
})