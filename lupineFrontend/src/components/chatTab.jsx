"use client"
import user from "../img/user.png";
import "../styles/chatTab.scss"

const ChatTab = ({ chatRoom, isActive, onClick }) => {
  const { chat_name, chatRoomImage, last_message_content, last_message_sender, timestamp } = chatRoom

  return (
    <div className={`chatTabContainer ${isActive ? "active" : ""}`} onClick={onClick}>
      <div className="chatTabContainer__avatar">
        <img src={chatRoomImage || user || "/placeholder.svg"} alt={chat_name} />
      </div>

      <div className="chatTabContainer__titleMessage">
        <h2>{chat_name}</h2>
        <h3>{last_message_content || "No messages yet"}</h3>
      </div>

      {timestamp && <div className="chatTabContainer__timestamp">{timestamp}</div>}

      <div className="chatTabContainer__unread"></div>
    </div>
  )
}

export default ChatTab
