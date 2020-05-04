import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import ApiContext from '../../ApiContext'
import config from '../../config'
import './Post.css'

export default class Post extends React.Component {

  static defaultProps ={
    onDeletePost: () => {},
  }
  static contextType = ApiContext


  handleClickDelete = () => {
    const postId = this.props.id
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    }}
    const url = (`${config.API_ENDPOINT}/posts/${postId}`)
      fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json
      })
      .then(() => {
        this.context.handleDeletePost(postId)
        // allow parent to perform extra behaviour
        this.props.onDeletePost(postId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  
  render() {
    const { name, id, modified} = this.props
    if (!name || !id || !modified) {
      return null
    } 
    const formatDate = format(new Date(modified), 'MMMM do yyyy')
    return (
      <div className='Post'>
        <h2 className='Post__title'>
          <Link to={`/posts/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Post__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon={['fa', 'trash-alt']} />
          {' '}
          remove
        </button>
        <div className='Post__dates'>
          <div className='Post__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
            {formatDate}
            </span>
          </div>
        </div>
      </div>
    )   
  }
}





// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { format } from 'date-fns'
// import ApiContext from '../../ApiContext'
// import config from '../../config'
// import './Post.css'

// export default class Post extends React.Component {

//   static defaultProps ={
//     onDeletePost: () => {},
//   }
//   static contextType = ApiContext


//   handleClickDelete = () => {
//     const postId = this.props.id
//     const options = {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//     }}
//     const url = (`${config.API_ENDPOINT}/posts/${postId}`)
//       fetch(url, options)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Something went wrong')
//         }
//         return res.json
//       })
//       .then(() => {
//         this.context.handleDeletePost(postId)
//         // allow parent to perform extra behaviour
//         this.props.onDeletePost(postId)
//       })
//       .catch(error => {
//         console.error({ error })
//       })
//   }

  
//   render() {
//     const { content, name, id, modified} = this.props
//     if (!content || !name || !id || !modified) {
//       return null
//     } 
//     const formatDate = format(new Date(modified), 'hh:mm a / MMMM do yyyy')
//     return (
//       <div className='Post'>
//         <h2 className='Post__title'>
//           <Link to={`/posts/${id}`}>
//             {name}
//           </Link>
//         </h2>
//         <button
//           className='Post__delete'
//           type='button'
//           onClick={this.handleClickDelete}
//         >
//           <FontAwesomeIcon icon={['fa', 'trash-alt']} />
//           {' '}
//           remove
//         </button>
//         <div className='Post__content'>
//           <p className='Content'>
//           {content}
//           </p>
//         </div>
//         <div className='Post__dates'>
//           <div className='Post__dates-modified'>
//             <span className='Date'>
//             {formatDate}
//             </span>
//           </div>
//         </div>
//       </div>
//     )   
//   }
// }

