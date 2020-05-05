
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../../ApiContext'
import ConnectivityButton from '../../ConnectivityButton/ConnectivityButton'
import { countPostsForMember } from '../../Posts/posts-helpers'
import { countMessagesForMember } from '../../Messages/messages-helpers'
import './MemberListMain.css'


// This component is rendered in the sidebar for the '/' and 'member/:memberid' routes
export default class MemberListMain extends React.Component {
    static contextType = ApiContext
    render() {
        const { members = [], posts = [], messages = [] } = this.context
        return(
            <div className='MemberListMain'>
                <ul className='MemberListMain__list'>
                    { /* Loop through the array of members passed as a prop*/ }
                    { /* Create list item for each member in the array */}
                    {members.map(member =>
                        
                        <li key={member.id}>
                            <NavLink
                                className='MemberListMain__member-link'
                                to={`/members/${member.id}`}
                            >
                                <span className='MemberListMain__num-posts'>
                                    {countPostsForMember(posts, member.id)}
                                </span>

                                <span className='MemberListMain__num-messages'>
                                    {countMessagesForMember(messages, member.id)}
                                </span>

                                {member.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='Main__button-container'>
                    <ConnectivityButton
                        tag={Link}
                        to='/add-member'
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
            </div>
        )
    }
}


MemberListMain.defaultProps = {
members: []
}
