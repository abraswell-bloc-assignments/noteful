import React from 'react'
import ApiContext from '../../ApiContext'
import { findPost } from '../../posts-helpers'
import CircleButton from '../../CircleButton/CircleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Post from '../Post/Post'
import './PostPageMain.css'

export default class PostPageMain extends React.Component {
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

  handleDeletePost = postId => {
    this.props.history.push(`/`)
  }

  render(){
    const { posts=[] } = this.context
    const { postId } = this.props.match.params
    const post = findPost(posts, postId) || { content: '' }
    return(
      <section className='PostPageMain'>
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
        <Post
          id={post.id}
          name={post.name}
          modified={post.modified}
          onDeletePost={this.handleDeletePost}
        />

        <div className='PostPageMain__content'>
          {post.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}