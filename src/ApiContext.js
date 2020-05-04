import React from 'react'

export default React.createContext({
    messages: [],
    posts: [],
    members: [],
    addMember: () => {},
    addMessage: () => {},
    deleteMessage: () => {},
    addPost: () => {},
    deletePost: () => {}
})