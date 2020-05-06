import React from 'react'
//import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import ApiContext from '../ApiContext'
import config from '../config'


export default class Comment extends React.Component {

  static defaultProps ={
    onDeleteComment: () => {},
  }
  static contextType = ApiContext


  handleClickDelete = () => {
    const commentId = this.props.id
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    }}
    const url = (`${config.API_ENDPOINT}/comments/${commentId}`)
      fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json
      })
      .then(() => {
        this.context.handleDeleteComment(commentId)
        // allow parent to perform extra behaviour
        this.props.onDeleteComment(commentId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  
  render() {
    const { text, nickname, id, created_at} = this.props
    if (!text || !nickname || !id || !created_at) {
      return null
    } 
    const formatDate = format(new Date(created_at), 'hh:mm a MMMM do, yyyy')
    return (
      <div className='Item__in__list'>
        <h3 className='Item__title'>
            {nickname}
        </h3>
        <p className='Item__content'>
          {text}
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