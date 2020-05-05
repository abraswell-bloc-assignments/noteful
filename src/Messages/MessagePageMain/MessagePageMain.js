import React from 'react'
import ApiContext from '../../ApiContext'
import { findMessage } from '../messages-helpers'
import ConnectivityButton from '../../ConnectivityButton/ConnectivityButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
      <section className='ItemPageMain'>
        <ConnectivityButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='Nav__back-button'
        >
          <FontAwesomeIcon icon={['fa', 'chevron-left']} />
          <br />
          Back
        </ConnectivityButton>

        <div className='ItemPageMain__content'>
          <p>Member:{' '}{message.nickname}</p>
          <div className='ItemPageMain__content'>
          {message.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>Content: {para}</p>
          )}
          </div>
          <p>Sent:{' '}{message.modified}</p>
          <p>Read:{' '}{message.read}</p>
          <button
            className='Item__delete'
            type='button'
            onClick={this.handleClickDelete}
          >
          <FontAwesomeIcon icon={['fa', 'trash-alt']} />
          {' '}
          remove
        </button>
        </div>


      </section>
    )
  }
}