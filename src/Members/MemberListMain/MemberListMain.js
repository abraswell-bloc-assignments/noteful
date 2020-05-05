
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../../ApiContext'
import ConnectivityButton from '../../ConnectivityButton/ConnectivityButton'
import Member from '../Member/Member'
import './MemberListMain.css'


export default class MemberListMain extends React.Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = ApiContext

    
    render() {
        const { members = [] } = this.context
        return(
            <section className='MemberListMain'>

                
                
                <h2 className='PageTitle'>Group Members</h2>

                        <div className='member-page-flexbox-container'>
                            {members.map(member =>  
                                <div key={member.id} className='member-flexbox-container'>
                                        <div className='member__img'>
                                            <Link to={`/members/${member.id}`}>
                                                <img 
                                                    src={require(`../../Images/User_${member.id}.jpg`)} 
                                                    alt='member headshot'
                                                    width='250px'
                                                >
                                                </img>
                                            </Link>      
                                        </div>    


                                        <div className='member__info'>
                                            <Member
                                                id={member.id}
                                                nickname={member.nickname}
                                                city={member.city}
                                                state={member.state}
                                            />
                                        </div>
                                </div>
                            )}
                        </div>
 

                <div className='Main__button-container'>
                <ConnectivityButton 
                    tag={Link}
                    to='/add-post'
                    type='button'
                    className='Main__add-button'
                >
                    <FontAwesomeIcon icon={['fa', 'plus']} />
                    <br />
                    Invite
                    <br />
                    Member
                </ConnectivityButton>
                </div>
            </section>           
        )
    }
}


MemberListMain.defaultProps = {
members: []
}
