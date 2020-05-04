import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import CircleButton from '../../CircleButton/CircleButton'
import Post from '../Post/Post'
import { getPostsForMember } from '../../posts-helpers'
import './PostListMain.css'

export default class PostListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  
  render() {
    const { memberid } = this.props.match.params
    const { posts=[] } = this.context
    const postsForMember = getPostsForMember(posts, memberid)
    return (
      <main className='PostListMain'>
        <ul>
          {postsForMember.map(post =>
            <li key={post.id}>
              <Post
                id={post.id}
                content={post.content}
                name={post.name}
                modified={post.modified}
              />
            </li>
          )}
        </ul>
        <div className='PostListMain__button-container'>
          <CircleButton 
            tag={Link}
            to='/add-post'
            type='button'
            className='PostListMain__add-post-button'
          >
            <FontAwesomeIcon icon={['fa', 'plus']} />
            <br />
            Post
          </CircleButton>
        </div>
      </main>
    )
  }
}




