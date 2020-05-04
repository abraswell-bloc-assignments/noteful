import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import ConnectivityForm from '../ConnectivityForm/ConnectivityForm'
import './AddMessage.css'

export default class AddMessage extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      id: '',
      idValid: false,
      validationIdMessage: '',
      name: '',
      nameValid: false,
      validationNameMessage: '',
      content: ''
    }
  }
  static contextType = ApiContext

  static defaultProps = {
    members: []
  }

  idChange = (letter) => {
    this.setState({ id: letter })
  }

  updateName = (name) => {
    this.setState({ name: name })
  }

  updateContent = (content) => {
    this.setState({ content: content })
  }

  isIdValid = (e) => {
    e.preventDefault()
    if (!this.state.id) {
      this.setState({
        validationIdMessage: 'You must choose a valid member',
        idValid: false
      })
    } else {
      this.setState(
        {
          validationIdMessage: '',
          nameValid: true
        }
      )
    }
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
        () => {
          this.handleAddMessage()
        }
      )
    }
  }

  handleAddMessage = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        modified: new Date(),
        memberid: this.state.id,
        content: this.state.content
      })
    }

    fetch(`${config.API_ENDPOINT}/messages/add-message`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json()
      })
      .then(data => {
        this.context.handleAddMessage(data)
      })
      .catch(err => {
        this.setState({ error: err.message })
      })
  }

  render() {
    return (
      <section className='AddMessage'>
        <h2>Create a message</h2>
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
        <ConnectivityForm
          className='AddMessage__Form'
          onSubmit={event => {
            this.isIdValid(event)
            this.isNameValid(event)
          }}
        >
          
        <div className='field form-group'>
          <label htmlFor="message-name">
            <input
              type='text'
              placeholder='Enter Name'
              className='new__message__name'
              id='message-name-input'
              name='message'
              aria-required="true"
              onChange={event => {
                this.updateName(event.target.value)
              }}
            />
          </label>
        </div>

        <div className='field form-group'>
          <label htmlFor="message-content"> 
            <textarea
              className='new__message__content'
              id='message-content-input'
              name='content'
              onChange={event => {
                this.updateContent(event.target.value)
              }}
            />
          </label>
        </div>

        <div className='field form-group'>
          <label htmlFor="select-member">
            <select
              id='message-member-select'
              name='message-member-id'
              aria-required="true"
              onChange={event => {
                this.idChange(event.target.value)
              }}
            >
              <option value={null}>Select Member</option>
              {this.context.members.map(member => (
                <option key={member.name} name='member' value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className='buttons'>
          <button type='submit'>
          <FontAwesomeIcon icon={['fa', 'plus']} />
            <br />
            Message

          </button>
        </div>
        </ConnectivityForm>
        {this.state.error && (
          <div>
            <p className='error__message'>{this.state.error}</p>
          </div>
        )}
      </section>
    )
  }
}

