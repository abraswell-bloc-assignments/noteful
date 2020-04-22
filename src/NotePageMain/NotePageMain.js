import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import ApiContext from '../ApiContext'
import config from '../config'
import Note from '../Note/Note'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  deleteNote = noteId => {
    this.props.history.push(`/`)
  }

  editNote = noteId => {
    this.props.history.push(`/`)
  }

  handleClickEdit = e => {
    e.preventDefault()
    const noteId = this.props.id
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.editNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onEditNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render(){
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return(
        <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.deleteNote}
          onEditNote={this.editNote}
        />
        <button
          className='Note__edit'
          type='button'
          onClick={this.handleClickEdit}
        > 
          <FontAwesomeIcon icon='pencil-alt' />
          {' '}
          edit
        </button>
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NotePageMain.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
