import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import PostPageNav from './PostPageNav'

it('renders without crashing', () => {

  const div = document.createElement('div')
  ReactDOM.render(<PostPageNav />, div)
  ReactDOM.unmountComponentAtNode(div)
  })

describe(`PostPageNav component`, () => {
  it('renders a .PostPageNav by default', () => {
    const wrapper = renderer
    .create(<PostPageNav />)
    .toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it.skip('renders a h3 with member name when in props', () => {
    const props = {
      match: {
        params: {
          postId: 'test-post-id'
        }
      }
    }
    const context = {
      posts: [{ id: 'test-post-id', memberid: 'test-member-id' }],
      members: [{ id: 'test-member-id', name: 'Important' }]
    }

    const h3 = renderer
    .create(<PostPageNav {...props} />, context)
    .find('.PostPageNav__member-name')
    .toJSON()
    expect(h3).toMatchSnapshot()
  })
})