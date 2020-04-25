import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'

export default class Note extends React.Component {

  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext


  handleClickDelete = () => {
    const noteId = this.props.id
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    }}
    const url = (`${config.API_ENDPOINT}/notes/${noteId}`)
      fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json
      })
      .then(() => {
        this.context.handleDeleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  
  render() {
    const { name, id, modified} = this.props
    if (!name || !id || !modified) {
      return null
    } 
    const formatDate = format(new Date(modified), 'MMMM do yyyy')
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon={['fa', 'trash-alt']} />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
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

