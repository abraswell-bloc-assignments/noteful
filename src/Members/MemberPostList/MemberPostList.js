


import React from 'react'
import ApiContext from '../../ApiContext'
//import { Link } from 'react-router-dom'
import { findMember } from '../members-helpers'
import { countPostsForMember } from '../../Posts/posts-helpers'
import { getPostsFromMember } from '../../Posts/posts-helpers'

// import ConnectivityButton from '../../ConnectivityButton/ConnectivityButton'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Post from '../../Posts/Post/Post'


export default class MemberPostList extends React.Component {
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

    render(){
        const { members=[], posts = [] } = this.context
        const { memberId } = this.props.match.params
        const member = findMember(members, memberId) || { content: '' }
        const postsFromMember = getPostsFromMember(posts, memberId)

        
        return(
            <div className='Member__activity__section'>
            <h3 className='SectionTitle'>Public Posts From This Member:{' '}{countPostsForMember(posts, member.id)} </h3>
            <ul>
                {postsFromMember.map(post =>
                <li key={post.id}>
                    <Post
                    id={post.id}
                    content={post.content}
                    nickname={post.nickname}
                    modified={post.modified}
                    />
                </li>
                )}
            </ul>
            </div>
        )
    }

}