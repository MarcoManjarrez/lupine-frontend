import "../styles/messageBubble.scss"

const MessageBubble = ({ sender_id, sender_username, content, type,  currentUserId }) => {
  const isCurrentUser = sender_id === currentUserId

  return (
    <div className={`messageBubble ${type === "system" ? "system" : isCurrentUser ? "sent" : "received"}`}>
      {!isCurrentUser && <span className="messageBubble__username">{sender_username}</span>}
      <div className="messageBubble__content">{content}</div>
    </div>
  )
}

export default MessageBubble