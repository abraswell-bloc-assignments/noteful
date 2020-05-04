
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../../ApiContext'
import CircleButton from '../../CircleButton/CircleButton'
import { countMessagesForMember } from '../../messages-helpers'
import './MessageListNav.css'


// This component is rendered in the sidebar for the '/' and 'member/:memberid' routes
export default class MessageListNav extends React.Component {
    static contextType = ApiContext
    render() {
        const { members = [], messages = [] } = this.context
        return(
            <aside className='MessageListNav'>
                <ul className='MessageListNav__list'>
                    { /* Loop through the array of members passed as a prop*/ }
                    { /* Create list item for each member in the array */}
                    {members.map(member =>
                        
                        <li key={member.id}>
                            <NavLink
                                className='MessageListNav__member-link'
                                to={`/members/${member.id}`}
                            >
                                <span className='MessageListNav__num-messages'>
                                    {countMessagesForMember(messages, member.id)}
                                </span>
                                {member.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='MessageListNav__button-wrapper'>
                    <CircleButton
                        tag={Link}
                        to='/add-member'
                        type='button'
                        className='MessageListNav__add-member-button'
                    >
                        <FontAwesomeIcon icon={['fa', 'plus']} />
                        <br />
                        Member
                    </CircleButton>
                </div>
            </aside>
        )
    }
}


MessageListNav.defaultProps = {
members: []
}

