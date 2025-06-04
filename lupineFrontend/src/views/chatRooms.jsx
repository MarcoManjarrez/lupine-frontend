"use client"

import { useContext, useState, useRef, useEffect} from "react";
import user from "../img/user.png";
import ChatTab from "../components/ChatTab";
import CreateChatModal from "../components/createChatModal";
import "../styles/chatRooms.scss";
import { NavLink } from "react-router-dom";
import { ChatRoomsContext } from "../context/chatRoomsContext";
import { MessageSquare, Search, PaperclipIcon, SendIcon, Plus } from "lucide-react";
import MessageBubble from "../components/messageBubble";
import moment from "moment";

const ChatRooms = () => {
  const { GetChats, SendMessage, chatMessage,  GetChatMessages} = useContext(ChatRoomsContext);
  const [activeChat, setActiveChat] = useState();
  const [message, setMessage] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const messagesEndRef = useRef(null)
  const currentUserId = 2
  const [chatTest, setChatTest] = useState([
    {
      message_id: 1,
      sender_id: 1,
      sender_username: "username1",
      content: "Hola a todos!",
      message_type: "text",
      created_at: "2025-01-01 12:00:00",
    },
    {
      message_id: 2,
      sender_id: 2,
      sender_username: "Pepe",
      content: "¡Hola! ¿Qué tal?",
      message_type: "text",
      created_at: "2025-01-01 12:01:00",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    GetChats(moment.format('MMMM Do YYYY, h:mm:ss'));
  }, [chatMessage, activeChat])

  const handleChatSelect = (chat) => {
    GetChatMessages(chat.id)
    setActiveChat(chat)
    // Here you would typically call getChat(chat.id) to fetch messages
  }

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return

    // Here you would send the message to your backend
    console.log(`Sending message to ${activeChat.chatRoomName}: ${message}`)

    SendMessage(activeChat.id, message)

    // setChatTest((prev) => [
    //   ...prev,
    //   {
    //     message_id: 1, // o un uuid
    //     sender_id: 1,
    //     sender_username: "username1",
    //     content: message,
    //     message_type: "text",
    //     created_at: new Date().toISOString(),
    //   },
    // ])

    setMessage("")
    GetChatMessages(activeChat.id)
  }

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  } 

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  } 

  const handleCreateModalSend = () => {
    setIsCreateModalOpen(false);
    
  } 

  return (
    <div className="chatRoomsContainer">
      <div className="sidebar">
        <div className="sidebar__textContainer">
          <h1>Chats</h1>
          <button onClick={handleCreateModalOpen}><Plus /></button>
        </div>
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
              {chatMessage.length === 0 ? (
                <div className="empty-message">
                  <p>No hay mensajes aún. Comienza la conversación.</p>
                </div>
              ) : (
                chatMessage.map((msg) => (
                  <MessageBubble
                    key={msg.message_id}
                    sender_id={msg.sender_id}
                    sender_username={msg.sender_username}
                    content={msg.content}
                    currentUserId={currentUserId}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
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
      {isCreateModalOpen ? (<CreateChatModal handleCreateModalClose={handleCreateModalClose} handleCreateModalSend={handleCreateModalSend}/>) : null}
    </div>
  )
}

export default ChatRooms
