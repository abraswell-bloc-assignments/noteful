import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import CircleButton from '../../CircleButton/CircleButton'
import Message from '../Message/Message'
import { getMessagesForMember } from '../../messages-helpers'
import './MessageListMain.css'

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
      <main className='PostListMain'>
        <ul>
          {messagesForMember.map(message =>
            <li key={message.id}>
              <Message
                id={message.id}
                content={message.content}
                name={message.name}
                modified={message.modified}
              />
            </li>
          )}
        </ul>
        <div className='MessageListMain__button-container'>
          <CircleButton 
            tag={Link}
            to='/add-message'
            type='button'
            className='MessageListMain__add-message-button'
          >
            <FontAwesomeIcon icon={['fa', 'plus']} />
            <br />
            Message
          </CircleButton>
        </div>
      </main>
    )
  }
}






// export default class MessageListMain extends React.Component {
//   static defaultProps = {
//     match: {
//       params: {}
//     }
//   }
//   static contextType = ApiContext

  
//   render() {
//     const { memberid } = this.props.match.params
//     const { messages=[] } = this.context
//     const messagesForMember = getMessagesForMember(messages, memberid)
//     return (
//       <main className='MessageListMain'>
//         <ul>
//           {messagesForMember.map(message =>
//             <li key={message.id}>
//               <Message
//                 id={message.id}
//                 content={message.content}
//                 name={message.name}
//                 modified={message.modified}
//               />
//             </li>
//           )}
//         </ul>
//         <div className='MessageListMain__button-container'>
//           <CircleButton 
//             tag={Link}
//             to='/add-message'
//             type='button'
//             className='MessageListMain__add-message-button'
//           >
//             <FontAwesomeIcon icon={['fa', 'plus']} />
//             <br />
//             Message
//           </CircleButton>
//         </div>
//       </main>
//     )
//   }
// }
