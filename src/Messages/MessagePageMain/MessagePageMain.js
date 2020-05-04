import React from 'react'
import ApiContext from '../../ApiContext'
import { findMessage } from '../../messages-helpers'
import CircleButton from '../../CircleButton/CircleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Message from '../Message/Message'
import './MessagePageMain.css'

export default class MessagePageMain extends React.Component {
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

  handleDeleteMessage = messageId => {
    this.props.history.push(`/`)
  }

  render(){
    const { messages=[] } = this.context
    const { messageId } = this.props.match.params
    const message = findMessage(messages, messageId) || { content: '' }
    return(
      <section className='MessagePageMain'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='PostPageNav__back-button'
        >
          <FontAwesomeIcon icon={['fa', 'chevron-left']} />
          <br />
          Back
        </CircleButton>
        <Message
          id={message.id}
          name={message.name}
          modified={message.modified}
          onDeleteMessage={this.handleDeleteMessage}
        />

        <div className='MessagePageMain__content'>
          {message.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}