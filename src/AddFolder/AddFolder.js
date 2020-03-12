import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotePageNav from '../NotePageNav/NotePageNav'
import ValidationError from '../Validation/ValidationError'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

class AddFolder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: '',
                touched: false
            }
        }
    }

    static contextType = ApiContext

    // validateName(fieldValue){
    //     const name = this.state.name.value.trim()

    //     if (name.length === 0 ) {
    //         return 'Name is required'
    //     } else if (name.length < 3) {
    //         return 'Name must be at least 3 characters long'
    //     }
    // }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        // uses input's name
    }

    submitHandler = (e) => {  
        e.preventDefault()
        const specificEndpoint = `${config.API_ENDPOINT}/folders` 
        const folderName = this.state

      fetch(specificEndpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
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
            this.setState({error})
        })
    }

    render(){
        
        return(
            <div>
                <NotePageNav />
                
                <form className='AddFolder__form'>
                    <h3>Add a Folder</h3>
                    <div className='AddFolder_form-group'>
                        <input 
                            type='text' 
                            className='new__note__name'
                            name='name' 
                            id='name' 
                            onChange={this.changeHandler}
                            />
                            {this.state.name.touched && (
                                <ValidationError message={this.validateName()}/>
                            )}
                    </div>

                    {/* <button type='submit'>Submit</button> */}
                    <div className='NoteListNav__button-wrapper'>
                    <CircleButton
                        className='NoteListNav__add-folder-button'
                        onClick={this.submitHandler}
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

export default AddFolder


