import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faEdit, faChevronLeft, faTrashAlt, faCheckDouble,faPencilAlt,} 
  from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddUser from '../AddUser/AddUser'
import ApiContext from '../ApiContext'
import AddPost from '../AddPost/AddPost'
import config from '../config';
import { findPost, findUser } from '../posts-helpers'
import ConnectivityError from '../ConnectivityError/ConnectivityError'
import PostListMain from '../PostListMain/PostListMain'
import PostListNav from '../PostListNav/PostListNav'
import PostPageMain from '../PostPageMain/PostPageMain'
import PostPageNav from '../PostPageNav/PostPageNav'
import './App.css'


library.add(faPlus, faEdit, faChevronLeft, faTrashAlt, faCheckDouble, faPencilAlt)

class App extends Component {
  state = {
    posts: [],
    editPostId: null,
    users: [],
    err: null
  }

  UserUrl = `${config.API_ENDPOINT}/users`
  PostUrl = `${config.API_ENDPOINT}/posts`

  componentDidMount() {
    fetch(this.UserUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          users: data,
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
  }

  handleAddUser = user => {
    this.setState(
      {
        users: [...this.state.users, user]
      },
      () => this.props.history.replace('/')
    )
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

  renderNavRoutes() {
    const { posts, users } = this.state
    return (
      <>
        {/* Main Route */}
        {['/', '/users/:userid'].map(path => (
          <Route exact key={path} path={path} component={PostListNav} />
        ))}
        <Route
          path='/posts/:postId'
          render={routeProps => {
            const { postId } = routeProps.match.params
            const post = findPost(posts, postId) || {}
            const user = findUser(users, post.userid)
            return <PostPageNav {...routeProps} user={user} />
          }}
        />
        {/* Other Routes -- Back Button */}
        <Route path='/add-user' component={PostPageNav} />
        <Route path='/add-post' component={PostPageNav} />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {/* Main Route */}
        {['/', '/users/:userid'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              return <PostListMain {...routeProps} />
            }}
          />
        ))}
        {/* Post Route */}
        <Route
          path='/posts/:postId'
          render={routeProps => {
            return <PostPageMain {...routeProps} />
          }}
        />
        {/* Add-User Route */}
        <Route path='/add-user' component={AddUser} />
        {/* Add-Post Route */}
        <Route path='/add-post' component={AddPost} />
      </>
    )
  }
  render() {
    return (
      <ApiContext.Provider
        value={{
          users: this.state.users,
          posts: this.state.posts,
          handleAddUser: this.handleAddUser,
          handleAddPost: this.handleAddPost,
          handleDeletePost: this.handleDeletePost
        }}
      >
        <div className='App'>
          <ConnectivityError>
            <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          </ConnectivityError>
          <header className='App__header'>
            <h1>
              <Link to='/'>Connectivity</Link>{' '}
              <FontAwesomeIcon icon={['fa', 'check-double']} />
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