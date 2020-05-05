import { findMessage, findMessageMember } from '../Messages/messages-helpers'
import { findPost, findPostMember } from '../Posts/posts-helpers'

import PostListNav from '../Posts/PostListNav/PostListNav'
import PostPageNav from '../Posts/PostPageNav/PostPageNav'

renderNavRoutes() {
    const { messages, posts, members } = this.state
    return (
      <>
        {/* Main Route */}
        {['/', '/members', '/messages', '/posts'].map(path => (
          <Route exact key={path} path={path} component={PostListNav} />
        ))}
        <Route
          path='*'
          render={routeProps => {
            const { postId } = routeProps.match.params
            const post = findPost(posts, postId) || {}
            const member = findPostMember(members, post.memberid)
            return <PostPageNav {...routeProps} member={member} />
          }}
        />
        <Route
          path='/posts/:postId'
          render={routeProps => {
            const { postId } = routeProps.match.params
            const post = findPost(posts, postId) || {}
            const member = findPostMember(members, post.memberid)
            return <PostPageNav {...routeProps} member={member} />
          }}
        />
        <Route
          path='/messages/:messageId'
          render={routeProps => {
            const { messageId } = routeProps.match.params
            const message = findMessage(messages, messageId) || {}
            const member = findMessageMember(members, message.memberid)
            return <PostPageNav {...routeProps} member={member} />
          }}
        />
        {/* Other Routes -- Back Button */}
        <Route path='/add-member' component={PostPageNav} />
        <Route path='/add-post' component={PostPageNav} />
        <Route path='/add-message' component={PostPageNav} />
      </>
    )
  }