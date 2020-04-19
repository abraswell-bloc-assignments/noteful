import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import './AddFolder.css'
import ApiContext from '../ApiContext'

export default class AddFolder extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      name: '',
      nameValid: false,
      validationMessage: ''
    };
  }
  static contextType = ApiContext

  isNameValid = (e) => {
    e.preventDefault()
    if (!this.state.name) {
      this.setState({
        validationMessage: 'Please enter a folder name',
        nameValid: false
      })
    } 
    else if (this.state.name.length < 3) {
      this.setState({
        validationMessage: 'Folder name must be at least 3 characters long',
        nameValid: false
      })
    }
    else if (this.state.name.length > 10) {
      this.setState({
        validationMessage: 'Folder name cannot be longer than 10 characters',
        nameValid: false
      })
    }
    
    else {
      this.setState(
        {
          validationMessage: '',
          nameValid: true
        },
        this.handleAddFolder()
      )
    }
  }

  handleAddFolder = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name
      })
    }

    fetch('http://localhost:8000/api/folders', options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.context.handleAddFolder(data)
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }

  updateName = (name) => {
    this.setState({ name: name })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h3>Create a folder</h3>

        {!this.state.nameValid && (
          <div>
            <p className='error__message'>{this.state.validationMessage}</p>
          </div>
        )}

        <NotefulForm
          onSubmit={event => {
            this.isNameValid(event)
          }}
        >
        <div className='form AddFolder_form-group'>
          <div className='field form-group'>
            <label htmlFor="folder-name">
              <input
                type='text'
                className='new__folder__name' 
                name='folder'
                aria-required="true"
                onChange={event => this.updateName(event.target.value)}
              />
            </label>
          </div>
          <div className='buttons'>
            <button type='submit'>
            <FontAwesomeIcon icon='plus' />
              <br />
              Folder
            </button>
          </div>
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

AddFolder.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}
