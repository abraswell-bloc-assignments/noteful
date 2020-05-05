import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import ConnectivityButton from '../../ConnectivityButton/ConnectivityButton'
import Message from '../Message/Message'
import { getMessagesForMember } from '../messages-helpers'


export default class PostListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  
  render() {
    const { memberid } = this.props.match.params
    const { messages=[] } = this.context
    const messagesForMember = getMessagesForMember(messages, memberid)
    return (
      <section className='PostListMain'>
        <h2 className='PageTitle'>Private Messages</h2>
        <ul>
          {messagesForMember.map(message =>
            <li key={message.id}>
              <Message
                id={message.id}
                content={message.content}
                nickname={message.nickname}
                modified={message.modified}
              />
            </li>
          )}
        </ul>
        <div className='Main__button-container'>
          <ConnectivityButton 
            tag={Link}
            to='/add-message'
            type='button'
            className='Main__add-button'
          >
            <FontAwesomeIcon icon={['fa', 'plus']} />
            <br />
            New
            <br />
            Message
          </ConnectivityButton>
        </div>
      </section>
    )
  }
}






