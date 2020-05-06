export const findPostMember = (members=[], memberid) =>
  members.find(member => member.id === memberid)

export const findPost = (posts=[], postId) =>
  posts.find(post => post.id === postId)

export const getPostsFromMember = (posts=[], memberid) => (
  (!memberid)
    ? posts
    : posts.filter(post => post.memberid === memberid)
)

export const countPostsForMember = (posts=[], memberid) =>
  posts.filter(post => post.memberid === memberid).length

export const getCommentsForPost = (comments=[], post_id) => (
  (!post_id)
    ? comments
    : comments.filter(comment => comment.post_id === post_id)
)

