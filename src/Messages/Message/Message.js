import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import ApiContext from '../../ApiContext'
import config from '../../config'
import './Message.css'

export default class Message extends React.Component {

  static defaultProps ={
    onDeleteMessage: () => {},
  }
  static contextType = ApiContext


  handleClickDelete = () => {
    const messageId = this.props.id
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    }}
    const url = (`${config.API_ENDPOINT}/messages/${messageId}`)
      fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json
      })
      .then(() => {
        this.context.handleDeleteMessage(messageId)
        // allow parent to perform extra behaviour
        this.props.onDeleteMessage(messageId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  
  render() {
    const {name, id, modified} = this.props
    if (!name || !id || !modified) {
      return null
    } 
    const formatDate = format(new Date(modified), 'hh:mm a / MMMM do yyyy')
    return (
      <div className='Message'>
        <h2 className='Message__title'>
          <Link to={`/messages/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Message__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon={['fa', 'trash-alt']} />
          {' '}
          remove
        </button>
        <div className='Message__dates'>
          <div className='Message__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
            {formatDate}
            </span>
          </div>
        </div>
      </div>
    )   
  }
}

