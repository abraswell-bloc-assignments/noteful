import React from 'react'
import ApiContext from '../../ApiContext'
import { findPost } from '../../Posts/posts-helpers'
import ConnectivityButton from '../../ConnectivityButton/ConnectivityButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Member from '../Member/Member'
import './MemberPageMain.css'

export default class MemberPageMain extends React.Component {
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

  handleDeleteMember = memberId => {
    this.props.history.push(`/`)
  }

  render(){
    const { posts=[] } = this.context
    const { memberId } = this.props.match.params
    const member = findPost(posts, memberId) || { content: '' }
    return(
      <section className='MemberPageMain'>
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
        <Member
          id={member.id}
          name={member.name}
          modified={member.modified}
          onDeleteMember={this.handleDeleteMember}
        />

        <div className='MemberPageMain__content'>
          {member.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}