import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import ApiContext from '../../ApiContext'
import config from '../../config'


export default class Post extends React.Component {

  static defaultProps ={
    onDeletePost: () => {},
  }
  static contextType = ApiContext


  handleClickDelete = () => {
    const postId = this.props.id
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    }}
    const url = (`${config.API_ENDPOINT}/posts/${postId}`)
      fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json
      })
      .then(() => {
        this.context.handleDeletePost(postId)
        // allow parent to perform extra behaviour
        this.props.onDeletePost(postId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  
  render() {
    const { content, nickname, id, modified} = this.props
    if (!content || !nickname || !id || !modified) {
      return null
    } 
    const formatDate = format(new Date(modified), 'hh:mm a MMMM do, yyyy')
    return (
      <div className='Item__in__list'>
        <h3 className='Item__title'>
          <Link to={`/posts/${id}`}>
            {nickname}
          </Link>
        </h3>
        <p className='Item__content'>
          {content}
        </p>
        <button
          className='Item__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon={['fa', 'trash-alt']} />
          {' '}
          remove
        </button>
        <div className='Item__dates'>
          <div className='Item__dates-modified'>
            <span className='Date'>
            {formatDate}
            </span>
          </div>
        </div>
      </div>
    )   
  }
}





