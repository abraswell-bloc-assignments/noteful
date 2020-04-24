import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './EditNote.css'

export default class EditNote extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      editNoteId: '',
      id: '',
      name: this.context.name,
      content: this.context.content,
      folderid: this.context.folderid,
      validationRequestMessage: '',
      requestValid: false
    }
  }
  static contextType = ApiContext

  static defaultProps = {
    folders: []
  }

  // isRequestValid = (e, noteId) => {
  //   e.preventDefault()
  //   if ((!this.state.name) && (!this.state.content) && (!this.state.folderId)) {
  //     this.setState({
  //       validationRequestMessage: 'Please update either name, content, or folder',
  //       requestValid: false
  //     })
  //   } else {
  //     this.setState(
  //       {
  //         validationRequestMessage: '',
  //         requestValid: true
  //       },
  //       () => {
  //         this.handleClickEdit()
  //       }
  //     )
  //   }
  // }
    
  updateName = (name) => {
    this.setState({ name: name })
  }

  updateContent = (content) => {
    this.setState({ content: content })
  }

  updateFolderId = (folderid) => {
    this.setState({ folderid: folderid })
  }

  handleClickEdit = (noteId) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({                     
        name: this.state.name,
        content: this.state.content,
        folderid: this.state.folderid
      })
    }
    const url = (`${config.API_ENDPOINT}/notes/edit-note/${this.context.editNoteId}`)
    console.log("url:", url)
    fetch(url, options)
      .then(res => {
        if (!res.ok){
          throw new Error('Something went wrong')
        }
        return res.json()
      })
      .then(() => {
        this.context.handleEditNote(noteId)
        // allow parent to perform extra behaviour
        this.props.handleEditNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }


  render() { 
    return (
      <section className='EditNote'>
        <h2>Edit note</h2>
        <h3>Please edit at least one field</h3>
        {!this.state.requestValid && (
          <div>
            <p className='error__message'>{this.state.validationRequestMessage}</p>
          </div>
        )}

        <NotefulForm
          className='EditNote__Form'
        >
          
        <div className='field form-group'>
          <label htmlFor="note-name">
            <input
              type='text'
              placeholder='Enter Name'
              className='new__note__name'
              id='note-name-input'
              name='note'
              aria-required="true"
              onChange={event => {
                this.updateName(event.target.value)
              }}
            />
          </label>
        </div>

        <div className='field form-group'>
          <label htmlFor="note-content"> 
            <textarea
              className='new__note__content'
              id='note-content-input'
              name='content'
              onChange={event => {
                this.updateContent(event.target.value)
              }}
            />
          </label>
        </div>

        <div className='field form-group'>
          <label htmlFor="select-folder">
            <select
              id='note-folder-select'
              name='note-folder-id'
              aria-required="true"
            >
              <option value={null}>Select Folder</option>
              {this.context.folders.map(folder => (
                <option key={folder.name} name='folder' value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className='buttons'>
          <button type='submit'>
          <FontAwesomeIcon 
            onClick={this.handleClickEdit()}
            className='icon' 
            icon={['fa', 'edit']} 
          />
            <br />
            Edit

          </button>
        </div>
        </NotefulForm>
        {this.state.error && (
          <div>
            <p className='error__message'>{this.state.error}</p>
          </div>
        )}
      </section>
    )
  }
}

