import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotePageNav from '../NotePageNav/NotePageNav'
// import ValidationError from '../Validation/ValidationError'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

class AddFolder extends Component {
    static defaultProps = {
        history: {
          goBack: () => { }
        },
        match: {
          params: {}
        }
      }

    constructor(props) {
        super(props)
        this.state = {
            name : '',
            touched: false
        }
    }

    static contextType = ApiContext

    updateName = (name) => {
        this.setState({
            name : name,
            touched: true
        })
      }

    validateName= () => {
        const name = this.state.name.trim()

        if (name.length === 0 ) {
            return alert('Name is required')
        } else if (name.length < 3) {
            return alert('Name must be at least 3 characters long')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const specificEndpoint = `${config.API_ENDPOINT}/folders`
        const folderName = this.state
        
        fetch(specificEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(folderName)
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
            this.context.addFolder(data);
            this.props.history.push('/')
        })

        .catch(error => {
            console.error({ error })
        })
    }

    render(props){       
        return(
            <section>
                <NotePageNav onClick={() => this.props.handleButtonClick()}/>
                <div className='AddFolder'>     
                    <h3>Add a Folder</h3>
                    <form className='AddFolder__form'>
                        <div className='AddFolder_form-group'>
                            <input 
                                onChange={e => this.updateName(e.target.value)}
                                type='text' 
                                className='new__folder__name'
                                name='folder-name' 
                                id='folder-name-input'
                                required 
                            />
                            {this.state.name.touched && (
                                alert('name is required')
                                // <ValidationError message={this.validateName()}/>
                            )}   
                        </div>

                        <div className='NoteListNav__button-wrapper'>
                        <CircleButton
                            className='NoteListNav__add-folder-button'
                            onClick={this.handleSubmit}
                        >
                            <FontAwesomeIcon icon='plus' />
                            <br />
                            Submit
                        </CircleButton>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default AddFolder


