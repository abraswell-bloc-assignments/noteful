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
      editNoteId: '',
      content: '',
      folderid: '',
      nameValid: false,
      folderidValid: false,
      validationNameMessage: '',
      validationfolderidMessage: ''
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

  // isfolderidValid = (e) => {
  //   e.preventDefault()
  //   if (!this.state.folderid) {
  //     this.setState({
  //       validationfolderidMessage: 'You must choose a valid folder',
  //       folderidValid: false
  //     })
  //   } else {
  //     this.setState(
  //       {
  //         validationfolderidMessage: '',
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

  updateFolderId = (folderid) => {
    this.setState({ folderid: folderid })
  }

  componentDidMount(){
    console.log(this.context.editNoteId)
    this.updateNoteId()
  }

  updateNoteId = () => {
    const noteId = (this.context.editNoteId)

    this.setState({
          editNoteId: noteId
          })
    console.log(noteId)
    console.log(this.state.editNoteId)
  }

    // isNameValid = (e) => {
  //   e.preventDefault()
  //   if (!this.state.name) {
  //     this.setState({
  //       validationNameMessage: 'Please enter a name',
  //       nameValid: false
  //     })

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
    const url = (`${config.API_ENDPOINT}/notes/edit-note/${noteId}`)
    console.log(url)
    fetch(url, options)
      .then(res => {
        if (!res.ok){
          throw new Error('Something went wrong')
        }
        alert(url)
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
    return (
      <section className='EditNote'>
        <h2>Edit note</h2>
        <h3>Please edit at least one field</h3>
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

