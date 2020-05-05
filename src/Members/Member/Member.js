import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'



export default class Member extends React.Component {

  static defaultProps ={
    onDeleteMember: () => {},
  }
  static contextType = ApiContext

  
  render() {
    const { nickname, id, city, state} = this.props
    if (!nickname || !id || !city || !state) {
      return null
    } 

    return (
      <div className='Item__in__list'>
        <h2 className='Member__title'>
          <Link to={`/members/${id}`}>
            {nickname}
          </Link>
        </h2>
        <p className='Member__location'>
          {city}, {state}
        </p>
      </div>
    )   
  }
}





