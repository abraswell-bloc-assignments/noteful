import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PostPageMain from './PostPageMain'

describe(`PostPageMain component`, () => {
  it('renders a .PostPageMain by default', () => {
    const wrapper = shallow(<PostPageMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  // enzyme doesn't yet support React.createContext
  it.skip('renders a Post with post prop', () => {
    const props = {
      match: {
        params: {
          postId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }
    const context = {
      posts: [{
        id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
        name: `Dogs`,
        modified: `2019-01-03T00:00:00.000Z`,
        // memberid: b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1,
        content: "Corporis accusamus placeat.\n \rUnde."
      }]
    }
    const post = shallow(<PostPageMain {...props} />, context)
      .find('Post')
    expect(toJson(post)).toMatchSnapshot()
  })

  // enzyme doesn't yet support React.createContext
  it.skip(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    const props = {
      match: {
        params: {
          postId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }

    const postsContextWithDifferentContent = [
      {
        posts: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n r.\n \rafter n r.",
          }
        ]
      },
      {
        posts: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n.\nafter."
          }
        ]
      }
    ]

    postsContextWithDifferentContent.forEach(context => {
      const content = shallow(<PostPageMain {...props} />, context)
        .find('PostPageMain__content')
      expect(toJson(content)).toMatchSnapshot()
    })
  })
})