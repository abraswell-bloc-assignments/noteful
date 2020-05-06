import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faEdit, faChevronLeft, faTrashAlt, faCheckDouble,faPencilAlt,} 
  from '@fortawesome/free-solid-svg-icons'
import ApiContext from '../ApiContext'
import config from '../config'
import ConnectivityError from '../ConnectivityError/ConnectivityError'
import Nav from '../ConnectivityNav/ConnectivityNav'

import AddMessage from '../AddMessage/AddMessage'
import AddPost from '../AddPost/AddPost'

import AddMember from '../AddMember/AddMember'

import MemberListMain from '../Members/MemberListMain/MemberListMain'
import MemberPageMain from '../Members/MemberPageMain/MemberPageMain'


import MessageListMain from '../Messages/MessageListMain/MessageListMain'
import MessagePageMain from '../Messages/MessagePageMain/MessagePageMain'

import PostListMain from '../Posts/PostListMain/PostListMain'
import PostPageMain from '../Posts/PostPageMain/PostPageMain'

import './App.css'


library.add(faPlus, faEdit, faChevronLeft, faTrashAlt, faCheckDouble, faPencilAlt)

class App extends Component {
  state = {
    comments: [],
    members: [],
    messages: [],
    posts: [],
    editMessageId: null,
    editPostId: null,
    err: null
  }

  CommentUrl = `${config.API_ENDPOINT}/comments`
  MemberUrl = `${config.API_ENDPOINT}/members`
  PostUrl = `${config.API_ENDPOINT}/posts`
  MessageUrl = `${config.API_ENDPOINT}/messages`

  componentDidMount() {
    fetch(this.MemberUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          members: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
        console.log(err)
      })

    fetch(this.PostUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })

      fetch(this.CommentUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          comments: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
        console.log(err)
      })

      fetch(this.MessageUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          messages: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }

  handleAddMember = member => {
    this.setState(
      {
        members: [...this.state.members, member]
      },
      () => this.props.history.replace('/')
    )
  }

  handleAddComment = comment => {
    this.setState({ comments: [...this.state.comments, comment] }, () =>
      this.props.history.replace('/')
    )
  }

  handleDeleteComment = commentId => {
    this.setState({
        comments: this.state.comments.filter(comment => comment.id !== commentId)
    })
  }

  handleAddMessage = message => {
    this.setState({ messages: [...this.state.messages, message] }, () =>
      this.props.history.replace('/')
    )
  }

  handleDeleteMessage = messageId => {
    this.setState({
        messages: this.state.messages.filter(message => message.id !== messageId)
    })
  }

  handleAddPost = post => {
    this.setState({ posts: [...this.state.posts, post] }, () =>
      this.props.history.replace('/')
    )
  }

  handleDeletePost = postId => {
    this.setState({
        posts: this.state.posts.filter(post => post.id !== postId)
    })
  }

  renderMainRoutes() {
    return (
      <>
        {/* Main Route */}
          <Route
            exact
            path={'/'}
            render={routeProps => {
              return <PostListMain {...routeProps} />
            }}
          />

        {/* Post Route */}
        <Route
          path='/posts/:postId'
          render={routeProps => {
            return <PostPageMain {...routeProps} />
          }}
        />

        {/* Member Route */}
        <Route
          exact
          path='/members'
          render={routeProps => {
            return <MemberListMain {...routeProps} />
          }}
        />
        <Route
          path='/members/:memberId'
          render={routeProps => {
            return <MemberPageMain {...routeProps} />
          }}
        />
        
        {/* Message Route */}
        <Route
          exact
          path='/messages'
          render={routeProps => {
            return <MessageListMain {...routeProps} />
          }}
        />
        <Route
          path='/messages/:messageId'
          render={routeProps => {
            return <MessagePageMain {...routeProps} />
          }}
        />

        {/* Add-Member Route */}
        <Route path='/add-member' component={AddMember} />
        {/* Add-Message Route */}
        <Route path='/add-message' component={AddMessage} />
        {/* Add-Post Route */}
        <Route path='/add-post' component={AddPost} />
        
      </>
    )
  }
  render() {
    return (
      <ApiContext.Provider
        value={{
          members: this.state.members,
          messages: this.state.messages,
          posts: this.state.posts,
          handleAddMember: this.handleAddMember,
          handleAddComment: this.handleAddComment,
          handleDeleteComment: this.handleDeleteComment,
          handleAddMessage: this.handleAddMessage,
          handleDeleteMessage: this.handleDeleteMessage,
          handleAddPost: this.handleAddPost,
          handleDeletePost: this.handleDeletePost,
        }}
      >
        <div className='App'>
          <ConnectivityError>
            <Nav />
          </ConnectivityError>
          <header className='App__header'>
            <h1>
              <Link to='/'>Connectivity</Link>{' '}
            </h1>
          </header>
          <ConnectivityError>
            <main className='App__main'>{this.renderMainRoutes()}</main>
          </ConnectivityError>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default withRouter(App)