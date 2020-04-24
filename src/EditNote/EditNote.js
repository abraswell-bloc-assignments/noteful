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
      name: '',
      id: '',
      content: '',
      folderId: '',
      nameValid: false,
      folderIdValid: false,
      validationNameMessage: '',
      validationFolderIdMessage: ''
    }
  }
  static contextType = ApiContext

  static defaultProps = {
    folders: []
  }

  // isNameValid = (e) => {
  //   e.preventDefault()
  //   if (!this.state.name) {
  //     this.setState({
  //       validationNameMessage: 'Please enter a name',
  //       nameValid: false
  //     })
  //   } else {
  //     this.setState(
  //       {
  //         validationNameMessage: '',
  //         nameValid: true
  //       },
  //     )
  //   }
  // }

  // isFolderIdValid = (e) => {
  //   e.preventDefault()
  //   if (!this.state.folderId) {
  //     this.setState({
  //       validationFolderIdMessage: 'You must choose a valid folder',
  //       folderIdValid: false
  //     })
  //   } else {
  //     this.setState(
  //       {
  //         validationFolderIdMessage: '',
  //         nameValid: true
  //       },
  //       () => {
  //         this.editNote()
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

  updateFolderId = (folderId) => {
    this.setState({ folderId: folderId })
  }

  handleClickEdit = () => {
    const noteId = this.context.notes
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
    }}
    const url = (`${config.API_ENDPOINT}/notes/edit-note/${noteId}`)
    console.log(noteId)
    fetch(url, options)
      .then(res => {
        if (!res.ok){
          throw new Error('Something went wrong')
        }
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


  render() {
  console.log(this.context)
    return (
      <section className='EditNote'>
        <h2>Edit note</h2>
        {!this.state.nameValid && (
          <div>
            <p className='error__message'>{this.state.validationNameMessage}</p>
          </div>
        )}

        {!this.state.idValid && (
          <div>
            <p className='error__message'>{this.state.validationIdMessage}</p>
          </div>
        )}
        <NotefulForm
          className='EditNote__Form'
          // onSubmit={event => {
          //   this.handleClickEdit(event)
          // }}
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
              onChange={event => {
                this.idChange(event.target.value)
              }}
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
            onClick={this.handleClickEdit}
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

