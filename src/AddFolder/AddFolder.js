import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import config from '../config'

class AddFolder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: ''
            }
        }
    }

    static contextType = ApiContext

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

        // .then(responseData => {
        //     this.context.addFolder(responseData)
        // })

        .then(data => {
            this.setState({name: {value: ''}})
            this.props.history.push('/')
        })

        .catch(error => {
            this.setState({error})
        })
    }

    render(){
        
        return(
            <div>
                <form className='form' onSubmit={this.submitHandler}>
                    <h2>Add a Note</h2>
                    <div className='form-group'>
                        <input 
                            type='text' 
                            className='new__note__name'
                            name='name' 
                            id='name' 
                            onChange={this.changeHandler}
                        />  
                    </div>
                    <button type='submit'>Submit</button>
                </form>

            </div>
        )
    }
}

export default AddFolder


