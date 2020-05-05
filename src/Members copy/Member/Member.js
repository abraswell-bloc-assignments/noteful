import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import ApiContext from '../../ApiContext'
import config from '../../config'
// import './Member.css'

export default class Member extends React.Component {

  static defaultProps ={
    onDeleteMember: () => {},
  }
  static contextType = ApiContext


  handleClickDelete = () => {
    const memberId = this.props.id
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    }}
    const url = (`${config.API_ENDPOINT}/members/${memberId}`)
      fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json
      })
      .then(() => {
        this.context.handleDeleteMember(memberId)
        // allow parent to perform extra behaviour
        this.props.onDeleteMember(memberId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  
  render() {
    const { name, id, modified} = this.props
    if (!name || !id || !modified) {
      return null
    } 
    const formatDate = format(new Date(modified), 'MMMM do yyyy')
    return (
      <div className='Member'>
        <h2 className='Member__title'>
          <Link to={`/members/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Member__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon={['fa', 'trash-alt']} />
          {' '}
          remove
        </button>
        <div className='Member__dates'>
          <div className='Member__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
            {formatDate}
            </span>
          </div>
        </div>
      </div>
    )   
  }
}





