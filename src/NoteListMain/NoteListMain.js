import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import CircleButton from '../CircleButton/CircleButton'
import Note from '../Note/Note'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  
  render() {
    const { folderid } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderid)
    return (
      <main className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton 
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon={['fa', 'plus']} />
            <br />
            Note
          </CircleButton>
        </div>
      </main>
    )
  }
}
