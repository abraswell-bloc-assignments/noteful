import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: ''
            },
            folder_id: {
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

    static defaultProps = {
        history: {
          push: () => { }
        },
      }

    static contextType = ApiContext

    updateName(name) {
        this.setState({name: {value: name}})
    }

    updateContent(content) {
        this.setState({content: {value: content}})
    }

    updateFolder(folder) {
        this.setState({folder_id: {value: folder}})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const specificEndpoint = `${config.API_ENDPOINT}/notes`
       
          const newNote = {
            name: this.state.name.value,
            content: this.state.content.value,
            folder_id: this.state.folder_id.value,
            modified: new Date(),
          }

          console.log(newNote)
        
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

        .then(note => {
            this.context.addNote(note);
            this.props.history.push(`./note/${note.id}`)
        })

        .catch(error => {
            this.setState({error})
        })
    }

    render(){
        const { folders = [] } = this.context
        return(
            <section>
                <div className='AddNote'>     
                    <h3>Add a Note</h3>
                    <form className='AddNote__Form'>
                        <div className='form-group'>
                            <input 
                                type='text' 
                                className='new__note__name'
                                name='noteName' 
                                id='note-name-input' 
                                onChange={e => this.updateName(e.target.value)}
                                required
                            />  
                        </div>
                        <div className='form-group'>
                            <input 
                                type='text' 
                                className='new__note__content'
                                name='content' 
                                id='note-content-input'
                                onChange={e => this.updateContent(e.target.value)}
                                required
                            />  
                        </div>
                        <div className='form-group'>
                            <select 
                                id='note-folder-select' 
                                name='note-folder-id'
                                onChange={e => this.updateFolder(e.target.value)}
                                required
                            >
                            <option value={null}>Select Folder</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                {folder.name}
                                </option>
                            )}
                            </select>
                        
                        <div className='AddNote__button-wrapper'>
                            <CircleButton
                                className='AddNote__add-note-button'
                                onClick={this.handleSubmit}
                            >
                                <FontAwesomeIcon icon='plus' />
                                <br />
                                Submit
                            </CircleButton>
                        </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }

}

export default AddNote

