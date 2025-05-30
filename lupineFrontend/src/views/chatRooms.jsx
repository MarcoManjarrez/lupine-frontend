"use client"

import { useContext, useState } from "react"
import user from "../img/user.png"
import ChatTab from "../components/ChatTab"
import "../styles/chatRooms.scss"
import { NavLink } from "react-router-dom"
import { ChatRoomsContext } from "../context/chatRoomsContext"
import { MessageSquare, Search, PaperclipIcon, SendIcon } from "lucide-react"

const ChatRooms = () => {
  const { getChat } = useContext(ChatRoomsContext)
  const [activeChat, setActiveChat] = useState(null)
  const [message, setMessage] = useState("")

  const chatRoomsTest = [
    {
      id: 1,
      chatRoomName: "Alex Johnson",
      chatRoomImage: user,
      lastMessage: "¿Cómo va todo?",
      timestamp: "04:02 am",
    },
    {
      id: 2,
      chatRoomName: "Grupo de Diseño",
      chatRoomImage: user,
      lastMessage: "Los mockups están listos",
      timestamp: "05:49 pm",
    },
    {
      id: 3,
      chatRoomName: "Soporte Técnico",
      chatRoomImage: user,
      lastMessage: "¿Pudiste resolver el problema?",
      timestamp: "01:34 pm",
    },
  ]

  const handleChatSelect = (chat) => {
    setActiveChat(chat)
    // Here you would typically call getChat(chat.id) to fetch messages
  }

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return

    // Here you would send the message to your backend
    console.log(`Sending message to ${activeChat.chatRoomName}: ${message}`)

    // Clear the input
    setMessage("")
  }

  return (
    <div className="chatRoomsContainer">
      <div className="sidebar">
        <h1>Chats</h1>
        <div className="searchContainer">
          <div className="search-input">
            <Search className="search-icon" size={16} />
            <input placeholder="Buscar chat" />
          </div>
        </div>
        <div className="chatList">
          {chatRoomsTest ? (
            chatRoomsTest.map((chatRoom, index) => (
              <ChatTab
                key={index}
                chatRoom={chatRoom}
                isActive={activeChat && activeChat.id === chatRoom.id}
                onClick={() => handleChatSelect(chatRoom)}
              />
            ))
          ) : (
            <>
              <h2>Aún no hay chats</h2>
              <NavLink to="/login" className="logout-button">
                <button>Volver al inicio</button>
              </NavLink>
            </>
          )}
        </div>
      </div>

      <div className="chatView">
        <NavLink to="/login" className="logout-button">
          <button>Cerrar sesión</button>
        </NavLink>
        {activeChat ? (
          <>
            <div className="chat-header">
              <div className="chat-user">
                <div className="avatar-container">
                  <img
                    src={activeChat.chatRoomImage || "/placeholder.svg"}
                    alt={activeChat.chatRoomName}
                    className="avatar"
                  />
                </div>
                <div className="user-info">
                  <h2>{activeChat.chatRoomName}</h2>
                </div>
              </div>
            </div>

            <div className="chat-messages">
              {/* Here you would map through messages */}
              <div className="empty-message">
                <p>No hay mensajes aún. Comienza la conversación.</p>
              </div>
            </div>

            <div className="chat-input">
              <button className="attachment-button">
                <PaperclipIcon size={20} />
              </button>
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button className="send-button" onClick={handleSendMessage} disabled={!message.trim()}>
                <SendIcon size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <MessageSquare size={48} color="rgba(255,255,255,0.2)" />
            <h2>Selecciona un chat para comenzar</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatRooms
