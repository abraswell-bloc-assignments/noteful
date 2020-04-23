import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

export default class AddNote extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      name: '',
      content: '',
      id: '',
      nameValid: false,
      idValid: false,
      validationNameMessage: '',
      validationIdMessage: ''
    }
  }
  static contextType = ApiContext

  static defaultProps = {
    folders: []
  }

  isNameValid = (e) => {
    e.preventDefault()
    if (!this.state.name) {
      this.setState({
        validationNameMessage: 'Please enter a name',
        nameValid: false
      })
    } else {
      this.setState(
        {
          validationNameMessage: '',
          nameValid: true
        },
      )
    }
  }

  isIdValid = (e) => {
    e.preventDefault()
    if (!this.state.id) {
      this.setState({
        validationIdMessage: 'You must choose a valid folder',
        idValid: false
      })
    } else {
      this.setState(
        {
          validationIdMessage: '',
          nameValid: true
        },
        () => {
          this.handleAddNote()
        }
      )
    }
  }

  
  updateName = (name) => {
    this.setState({ name: name })
  }

  updateContent = (content) => {
    this.setState({ content: content })
  }

  idChange = (letter) => {
    this.setState({ id: letter })
  }

  handleAddNote = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        modified: new Date(),
        folderid: this.state.id,
        content: this.state.content
      })
    }

    fetch(`${config.API_ENDPOINT}/notes/add-note`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.context.handleAddNote(data)
      })
      .catch(err => {
        this.setState({ error: err.message })
      })
  }

  render() {
    return (
      <section className='AddNote'>
        <h3>Create a note</h3>
        <NotefulForm
          className='AddNote__Form'
          onSubmit={event => {
            this.isNameValid(event)
            this.isIdValid(event)
          }}
        >

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
          
        <div className='field form-group'>
          <label htmlFor="note-name">
            <input
              type='text'
              defaultValue='Enter Name'
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
          <FontAwesomeIcon icon={['fa', 'plus']} />
            <br />
            Note

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

