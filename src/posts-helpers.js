export const findPostMember = (members=[], memberid) =>
  members.find(member => member.id === memberid)

export const findPost = (posts=[], postId) =>
  posts.find(post => post.id === postId)

export const getPostsForMember = (posts=[], memberid) => (
  (!memberid)
    ? posts
    : posts.filter(post => post.memberid === memberid)
)

export const countPostsForMember = (posts=[], memberid) =>
  posts.filter(post => post.memberid === memberid).length