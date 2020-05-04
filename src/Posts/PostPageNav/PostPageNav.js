import React from 'react'
import ApiContext from '../../ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../../CircleButton/CircleButton'
import { findPost, findPostMember } from '../../posts-helpers'
import './PostPageNav.css'

export default class PostPageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { 
        window.history.back()
       }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { posts, members, } = this.context
    const { postId } = this.props.match.params
    const post = findPost(posts, postId) || {}
    const member = findPostMember(members, post.memberid)
    return (
      <div className='PostPageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='PostPageNav__back-button'
        >
          <FontAwesomeIcon icon={['fa', 'chevron-left']} />
          <br />
          Back
        </CircleButton>
        {member && (
          <h3 className='PostPageNav__member-name'>
            {member.name}
          </h3>
        )}
      </div>
    )
  }
}
