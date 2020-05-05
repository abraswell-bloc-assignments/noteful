export const findMessageMember = (members=[], memberid) =>
  members.find(member => member.id === memberid)

export const findMessage = (messages=[], messageId) =>
  messages.find(message => message.id === messageId)

export const getMessagesForMember = (messages=[], memberid) => (
  (!memberid)
    ? messages
    : messages.filter(message => message.memberid === memberid)
)

export const countMessagesForMember = (messages=[], memberid) =>
  messages.filter(message => message.memberid === memberid).length