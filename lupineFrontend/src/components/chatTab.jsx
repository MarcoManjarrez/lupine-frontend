"use client"
import user from "../img/user.png";
import "../styles/chatTab.scss"

const ChatTab = ({ chatRoom, isActive, onClick }) => {
  const { chatRoomName, chatRoomImage, lastMessage, timestamp } = chatRoom

  return (
    <div className={`chatTabContainer ${isActive ? "active" : ""}`} onClick={onClick}>
      <div className="chatTabContainer__avatar">
        <img src={chatRoomImage || user || "/placeholder.svg"} alt={chatRoomName} />
      </div>

      <div className="chatTabContainer__titleMessage">
        <h2>{chatRoomName}</h2>
        <h3>{lastMessage || "No messages yet"}</h3>
      </div>

      {timestamp && <div className="chatTabContainer__timestamp">{timestamp}</div>}

      <div className="chatTabContainer__unread"></div>
    </div>
  )
}

export default ChatTab
