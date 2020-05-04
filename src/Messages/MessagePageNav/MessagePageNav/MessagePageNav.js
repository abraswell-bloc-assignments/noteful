import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../../../ApiContext'
import CircleButton from '../../../CircleButton/CircleButton'
import { findMessage, findMessageMember } from '../../../messages-helpers'
import './MessagePageNav.css'

export default class MessagePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { 
        window.history.back()
       }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { messages, members, } = this.context
    const { messageId } = this.props.match.params
    const message = findMessage(messages, messageId) || {}
    const member = findMessageMember(members, message.memberid)
    return (
      <div className='MessagePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='MessagePageNav__back-button'
        >
          <FontAwesomeIcon icon={['fa', 'chevron-left']} />
          <br />
          Back
        </CircleButton>
        {member && (
          <h3 className='MessagePageNav__member-name'>
            {member.name}
          </h3>
        )}
      </div>
    )
  }
}
