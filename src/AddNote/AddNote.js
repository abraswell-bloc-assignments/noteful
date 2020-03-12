import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotePageNav from '../NotePageNav/NotePageNav'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import config from '../config'

class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: ''
            },
            id: {
                value: ''
            },
            content: {
                value: ''
            },
            error: {
                value: null
            }
        }
    }

    static contextType = ApiContext

    updateName(name) {
        this.setState({name: {value: name}})
    }

    updateContent(content) {
        this.setState({content: {value: content}})
    }

    handleSubmit(event) {
        event.preventDefault()
        const modified = new Date()
        const newNote = {
            name: this.state.name.value,
            content: this.state.content.value,
            modified: modified
        }
        const specificEndpoint = `${config.API_ENDPOINT}/notes`
        
       
        this.setState({ error: null })
        fetch(specificEndpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newNote)
        })

        .then(res => {
            if(!res.ok) {
                //get the error message from the response
                return res.json().then(error => {
                    // then throw it
                    throw error
                })
            }
            return res.json()
        })

        .then(data => {
            this.context.addNote(data);
            this.props.history.push('/')
        })

        .catch(error => {
            this.setState({error})
        })
    }

    render(){
        return(
            <div className='parent-div'>
            <NotePageNav />
            <form className='form'>
                <h2>Add a Note</h2>
                <div className='form-group'>
                    <input 
                        type='text' 
                        className='new__note__name'
                        name='name' 
                        id='name' 
                        onChange={e => this.updateName(e.target.value)}
                    />  
                </div>
                <div className='form-group'>
                    <input 
                        type='text' 
                        className='new__note__content'
                        name='content' 
                        id='content' 
                        onChange={e => this.updateContent(e.target.value)}
                    />  
                </div>
                <div className='NoteListNav__button-wrapper'>
                    <CircleButton
                        className='NoteListNav__add-note-button'
                        onClick={e=> this.handleSubmit(e)}
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Submit
                    </CircleButton>
                    </div>
            </form>
            </div>
        )
    }

}

export default AddNote