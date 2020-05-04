
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../../ApiContext'
import CircleButton from '../../CircleButton/CircleButton'
import { countPostsForMember } from '../../posts-helpers'
import { countMessagesForMember } from '../../messages-helpers'
import './PostListNav.css'


// This component is rendered in the sidebar for the '/' and 'member/:memberid' routes
export default class PostListNav extends React.Component {
    static contextType = ApiContext
    render() {
        const { members = [], posts = [], messages = [] } = this.context
        return(
            <aside className='PostListNav'>
                <ul className='PostListNav__list'>
                    { /* Loop through the array of members passed as a prop*/ }
                    { /* Create list item for each member in the array */}
                    {members.map(member =>
                        
                        <li key={member.id}>
                            <NavLink
                                className='PostListNav__member-link'
                                to={`/members/${member.id}`}
                            >
                                <span className='PostListNav__num-posts'>
                                    {countPostsForMember(posts, member.id)}
                                </span>

                                <span className='MessageListNav__num-messages'>
                                    {countMessagesForMember(messages, member.id)}
                                </span>

                                {member.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='PostListNav__button-wrapper'>
                    <CircleButton
                        tag={Link}
                        to='/add-member'
                        type='button'
                        className='PostListNav__add-member-button'
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


PostListNav.defaultProps = {
members: []
}

