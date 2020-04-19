import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import NotefulError from '../NotefulError/NotefulError';
import { findNote, findFolder } from '../notes-helpers';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    err: null
  };
  FolderUrl = 'http://localhost:8000/api/folders';
  NoteUrl = 'http://localhost:8000/api/notes';

  componentDidMount() {
    fetch(this.FolderUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          folders: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
        console.log(err);
      });

    fetch(this.NoteUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          notes: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  handleAddFolder = folder => {
    this.setState(
      {
        folders: [...this.state.folders, folder]
      },
      () => this.props.history.replace('/')
    );
  };

  handleAddNote = note => {
    this.setState({ notes: [...this.state.notes, note] }, () =>
      this.props.history.replace('/')
    );
  };

  renderNavRoutes() {
    // Show/hide components in SIDEBAR section based on route
    // Main route leads to list of Folders
    // All other routes lead to <NotePageNav /> 'back' button
    const { notes, folders } = this.state;
    return (
      <>
        {/* Main Route */}
        {['/', '/api/folders/:folderid'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route
          path='/api/notes/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderid);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        {/* Other Routes */}
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-note' component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    // Show/hide components in MAIN section based on route
    // Main route leads to list of Notes
    // All other routes lead to <NotePageNav /> 'back' button
    return (
      <>
        {/* Main Route */}
        {/* 'notes' prop will be entire notes array from state in '/' Route */}
        {/* ':folderid'  will be the id of the folder in the url */}
        {['/', '/api/folders/:folderid'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              return <NoteListMain {...routeProps} />;
            }}
          />
        ))}
        {/* Note Route */}
        <Route
          path='/api/notes/:noteId'
          render={routeProps => {
            // Find the note that has the same id from the url (:noteId)
            return <NotePageMain {...routeProps} />;
          }}
        />
        {/* Add Folder Route */}
        {/* Puts Add Folder form in the Main Window */}
        <Route path='/api/add-folder' component={AddFolder} />
        {/* Add Note Route */}
        {/* Puts Add Note form in the Main Window */}
        <Route path='/api/add-note' component={AddNote} />
      </>
    );
  }
  render() {
    return (
      <ApiContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          deleteNote: this.handleDeleteNote,
          handleAddNote: this.handleAddNote,
          handleAddFolder: this.handleAddFolder
        }}
      >
        <div className='App'>
          <NotefulError>
            <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          </NotefulError>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>{' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <NotefulError>
            <main className='App__main'>{this.renderMainRoutes()}</main>
          </NotefulError>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default withRouter(App);