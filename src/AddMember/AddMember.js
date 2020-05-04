import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import ConnectivityForm from '../ConnectivityForm/ConnectivityForm'
import './AddMember.css'



export default class AddMember extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      name: '',
      nameValid: false,
      validationMessage: ''
    }
  }
  static contextType = ApiContext

  updateName = (name) => {
    this.setState({ name: name })
  }
  
  isNameValid = (e) => {
    e.preventDefault()
    if (!this.state.name) {
      this.setState({
        validationMessage: 'Please enter a member name',
        nameValid: false
      })
    } 
    else if (this.state.name.length < 3) {
      this.setState({
        validationMessage: 'Member name must be at least 3 characters long',
        nameValid: false
      })
    }
    else if (this.state.name.length > 10) {
      this.setState({
        validationMessage: 'Member name cannot be longer than 10 characters',
        nameValid: false
      })
    }
    
    else {
      this.setState(
        {
          validationMessage: '',
          nameValid: true
        },
        this.handleAddMember()
      )
    }
  }

  handleAddMember = () => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name
      })
    }

    fetch(`${config.API_ENDPOINT}/members/add-member`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.context.handleAddMember(data)
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }

  render() {
    return (
      <section className='AddMember'>
        <h3>Create a member</h3>

        {!this.state.nameValid && (
          <div>
            <p className='error__message'>{this.state.validationMessage}</p>
          </div>
        )}

        <ConnectivityForm
          onSubmit={event => {
            this.isNameValid(event)
          }}
        >
        <div className='form AddMember_form-group'>
          <div className='field form-group'>
            <label htmlFor="member-name">
              <input
                type='text'
                className='new__member__name' 
                name='member'
                aria-required="true"
                onChange={event => this.updateName(event.target.value)}
              />
            </label>
          </div>
          <div className='buttons'>
            <button type='submit'>
            <FontAwesomeIcon icon={['fa', 'plus']} />
              <br />
              Member
            </button>
          </div>
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


