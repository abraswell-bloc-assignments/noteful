import React from 'react'
import ApiContext from '../../ApiContext'
import { findPost } from '../posts-helpers'
import { getCommentsForPost } from '../posts-helpers'
import ConnectivityButton from '../../ConnectivityButton/ConnectivityButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Comment from '../../Comments/Comments'


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
    const { posts=[], comments=[] } = this.context
    const { postId } = this.props.match.params
    const commentsForPost = getCommentsForPost(comments, postId)
    const post = findPost(posts, postId) || { content: '' }
    return(
      <section className='ItemPageMain'>
        <div className='ItemPageMain__content'>
          <p>Member:{' '}{post.nickname}</p>
          <div className='ItemPageMain__content'>
          {post.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>Content:{' '}{para}</p>
          )}
          </div>
          <p>Like Count:{' '}{post.like_count}</p>
          <p>Comment Count:{' '}{post.comment_count}</p>
          <p>Posted:{' '}{post.modified}</p>
          <button
            className='Item__delete'
            type='button'
            onClick={this.handleClickDelete}
          >
            <FontAwesomeIcon icon={['fa', 'trash-alt']} />
            {' '}
            remove
          </button>
        </div>

        <div className='Member__activity'>
          <div className='Member__activity__section'>
              <ul>
                {commentsForPost.map(comment =>
                  <li key={comment.id}>
                    <Comment
                      // id={comment.id}
                      // text={comment.text}
                      nickname={comment.nickname}
                      // created_at={comment.created_at}
                    />
                  </li>
                )}
              </ul>
          </div>
        </div>

        <div className='Main__button-container'>
          <ConnectivityButton
            tag='button'
            role='link'
            onClick={() => this.props.history.goBack()}
            className='Nav__back-button'
          >
            <FontAwesomeIcon icon={['fa', 'chevron-left']} />
            <br />
            Back
          </ConnectivityButton>
        </div>

      </section>
    )
  }
}