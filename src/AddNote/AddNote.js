import React, {Component} from 'react'
import NotePageNav from '../NotePageNav/NotePageNav'
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
            // modified: newDate()
        }
        console.log('newNote: ', newNote)
        const specificEndpoint = `${config.API_ENDPOINT}/notes`
        
       
        this.setState({ error: null })
        fetch(specificEndpoint, {
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
            console.log(data)
        })

        .catch(error => {
            this.setState({error})
        })
    }

    render(){
        return(
            <div className='parent-div'>
            <NotePageNav />
            <form className='form'
                onSubmit={e=> this.handleSubmit(e)}>
                <h2>Add a Note</h2>
                <div className='form-group'>
                    <input type='text' className='new__note__name'
                        name='name' id='name' onChange={e => this.updateName(e.target.value)}
                    />  
                </div>
                <div className='form-group'>
                    <input type='text' className='new__note__content'
                        name='content' id='content' onChange={e => this.updateContent(e.target.value)}
                    />  
                </div>
                <div className='newNote__button__group'>
                    <button type='reset' className='newNote__button'>
                        Cancel
                    </button>
                    <button 
                        type='submit' 
                        className='newNote__button'
                    >
                            Save
                    </button>
                </div>

            </form>
            </div>
        )
    }

}

export default AddNote