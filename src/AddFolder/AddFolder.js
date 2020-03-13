import React, {Component} from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotefulForm from '../NotefulForm/NotefulForm'
// import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

class AddFolder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name : '',
            touched: false
        }
    }   

    updateName = (name) => {
        this.setState({
            name : name,
            touched: true
        })
      }

    static contextType = ApiContext

    handleSubmit = (e) => {
        e.preventDefault()

        const specificEndpoint = `${config.API_ENDPOINT}/folders`

        const folder = {
            name: e.target['folder-name'].value
        }
  
            fetch(specificEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(folder)
            })

            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })

            .then(folder => {
                this.context.addFolder(folder)
                this.props.history.push(`/folder/${folder.id}`)
              })

            .catch(error => {
                console.error('add folder', { error })
            })
            

        
    }

    render() {
        return (
            <div>  
                <section className='AddFolder'>
                    <h3>Create a folder</h3>
                    <NotefulForm onSubmit={this.handleSubmit}>
                        <div className='field AddFolder_form-group'>
                            <input 
                                type='text'
                                className='new__folder__name' 
                                id='folder-name-input' 
                                name='folder-name' 
                                required
                            />
                        </div>

                        <div className='buttons'>
                            <button type='submit'>
                            Add new folder
                            </button>
                        </div>
                    </NotefulForm>
                </section>
          </div>
        )
      }
}

export default AddFolder
