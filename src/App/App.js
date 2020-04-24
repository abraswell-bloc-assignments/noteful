import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faEdit, faChevronLeft, faTrashAlt, faCheckDouble,faPencilAlt,} 
  from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../config';
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ApiContext from '../ApiContext'
import EditNote from '../EditNote/EditNote'
import NotefulError from '../NotefulError/NotefulError'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import { findNote, findFolder } from '../notes-helpers'
import './App.css'

library.add(faPlus, faEdit, faChevronLeft, faTrashAlt, faCheckDouble, faPencilAlt)

class App extends Component {
  state = {
    notes: [],
    editNoteId: null,
    folders: [],
    err: null
  }
  FolderUrl = `${config.API_ENDPOINT}/folders`
  NoteUrl = `${config.API_ENDPOINT}/notes`

  componentDidMount() {
    fetch(this.FolderUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          folders: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
        console.log(err)
      })

    fetch(this.NoteUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          notes: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }

  handleAddNote = note => {
    this.setState({ notes: [...this.state.notes, note] }, () =>
      this.props.history.replace('/')
    )
  }

  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  handleEditNote = noteId => {
    this.setState({
      editNoteId: noteId
    })
  }

  handleAddFolder = folder => {
    this.setState(
      {
        folders: [...this.state.folders, folder]
      },
      () => this.props.history.replace('/')
    )
  }


  renderNavRoutes() {
    const { notes, folders } = this.state
    return (
      <>
        {/* Main Route */}
        {['/', '/folders/:folderid'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route
          path='/notes/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId) || {}
            const folder = findFolder(folders, note.folderid)
            return <NotePageNav {...routeProps} folder={folder} />
          }}
        />
        {/* Other Routes */}
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-note' component={NotePageNav} />
        <Route path='/edit-note' component={NotePageNav} />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {/* Main Route */}
        {/* 'notes' prop will be entire notes array from state in '/' Route */}
        {/* ':folderid'  will be the id of the folder in the url */}
        {['/', '/folders/:folderid'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              return <NoteListMain {...routeProps} />
            }}
          />
        ))}
        {/* Note Route */}
        <Route
          path='/notes/:noteId'
          render={routeProps => {
            return <NotePageMain {...routeProps} />
          }}
        />
        {/* Add Folder Route */}
        <Route path='/add-folder' component={AddFolder} />
        {/* Add Note Route */}
        <Route path='/add-note' component={AddNote} />
        <Route path='/edit-note' component={EditNote} />
      </>
    )
  }
  render() {
    return (
      <ApiContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          deleteNote: this.handleDeleteNote,
          editNote: this.handleEditNote,
          handleAddNote: this.handleAddNote,
          handleAddFolder: this.handleAddFolder,
          handleEditNote: this.handleEditNote, 
          editNoteId: this.state.editNoteId
        }}
      >
        <div className='App'>
          <NotefulError>
            <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          </NotefulError>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>{' '}
              <FontAwesomeIcon icon={['fa', 'check-double']} />
            </h1>
          </header>
          <NotefulError>
            <main className='App__main'>{this.renderMainRoutes()}</main>
          </NotefulError>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default withRouter(App)