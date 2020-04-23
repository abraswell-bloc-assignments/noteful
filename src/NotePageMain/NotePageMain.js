import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import config from '../config'
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
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}