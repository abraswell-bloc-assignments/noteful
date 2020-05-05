import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import ConnectivityButton from '../../ConnectivityButton/ConnectivityButton'
import Post from '../Post/Post'
import { getPostsFromMember } from '../posts-helpers'


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
    const postsFromMember = getPostsFromMember(posts, memberid)
    return (
      <section className='PostListMain'>
        <h2 className='PageTitle'>Public Posts</h2>
        <ul>
          {postsFromMember.map(post =>
            <li key={post.id}>
              <Post
                id={post.id}
                content={post.content}
                nickname={post.nickname}
                modified={post.modified}
              />
            </li>
          )}
        </ul>
        <div className='Main__button-container'>
          <ConnectivityButton 
            tag={Link}
            to='/add-post'
            type='button'
            className='Main__add-button'
          >
            <FontAwesomeIcon icon={['fa', 'plus']} />
            <br />            
            New
            <br />
            Post
          </ConnectivityButton>
        </div>
      </section>
    )
  }
}




