"use client"

import { useContext, useState, useRef, useEffect} from "react";
import user from "../img/user.png";
import ChatTab from "../components/ChatTab";
import CreateChatModal from "../components/createChatModal";
import KickChatModal from "../components/kickChatModal";
import ConfirmModal from "../components/confirmModal";
import "../styles/chatRooms.scss";
import { NavLink } from "react-router-dom";
import { ChatRoomsContext } from "../context/chatRoomsContext";
import { MessageSquare, Search, DoorOpen, SendIcon, Plus, Trash2 } from "lucide-react";
import MessageBubble from "../components/messageBubble";
import AddToChatModal from "../components/addToChatModal";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const ChatRooms = () => {
  const { GetChats, SendMessage, chatMessage,  GetChatMessages, chatsArray, LeaveChat, setChatsArray, GetChatInfo, activeChat, setActiveChat, setChatMessage} = useContext(ChatRoomsContext);
  // const [activeChat, setActiveChat] = useState();
  const {logOut} = useContext(AuthContext)
  const [message, setMessage] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isKickModalOpen, setIsKickModalOpen] = useState(false);
  const [isAddToChatOpen, setIsAddToChatOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const userId = localStorage.getItem("userId")

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

  const [chatTest, setChatTest] = useState([
    {
      message_id: 1,
      sender_id: 1,
      sender_username: "username1",
      content: "Hola a todos!",
      type: "text",
      created_at: "2025-01-01 12:00:00",
    },
    {
      message_id: 2,
      sender_id: 2,
      sender_username: "Pepe",
      content: "¡Hola! ¿Qué tal?",
      type: "text",
      created_at: "2025-01-01 12:01:00",
    },
    {
      message_id: 3,
      sender_id: 3,
      sender_username: "system",
      content: "¡Hola! ¿Qué tal?",
      type: "system",
      created_at: "2025-01-01 12:01:00",
    },
  ]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  //   GetChats("2023-01-01 00:00:00");
  // }, [chatMessage, activeChat])

  useEffect(() => {
    GetChats("2023-01-01 00:00:00");
  }, [])

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;

    const pollMessages = async () => {
      while (isMounted.current) {
        await GetChatMessages(activeChat.chat_id);
        // Espera 1 segundo antes de volver a hacer la petición
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    };

    pollMessages();

    // Cleanup para detener la petición si el componente se desmonta
    return () => {
      isMounted.current = false;
    };
  }, [GetChatMessages, activeChat]);
  const isMountedChats = useRef(true);
  useEffect(() => {
    isMountedChats.current = true;

    const pollChats = async () => {
      while (isMountedChats.current) {
        await GetChats(null);
        await new Promise((r) => setTimeout(r, 3000)); // por ejemplo, cada 3s
      }
    };

    pollChats();

    return () => {
      isMountedChats.current = false;
    };
  }, [GetChats]);



  const handleChatSelect = (chat) => {
    GetChatMessages(chat.chat_id);
    GetChatInfo(chat.chat_id)
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return

    // Here you would send the message to your backend
    console.log(`Sending message to ${activeChat}: ${message}`)

    SendMessage(activeChat.chat_id, message)

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
  }; 

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  }; 

  const handleCreateModalSend = () => {
    setIsCreateModalOpen(false);
  }; 

  const handleKickModalOpen = () => {
    setIsKickModalOpen(true);
  }; 

  const handleKickModalClose = () => {
    setIsKickModalOpen(false);
  }; 

  const handleKickModalSend = () => {
    setIsKickModalOpen(false);
    
  }; 

  const handleConfirmOpen = () => {
    setIsConfirmOpen(true);
  }; 

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  }; 

  const handleConfirmSend = () => {
    setIsConfirmOpen(false);
    
  }; 

  const handleAddToChatOpen = () => {
    setIsAddToChatOpen(true);
  }

  const handleAddToChatClose = () => {
    setIsAddToChatOpen(false);
  }

  const handleAddToChatSend = () => {
    setIsAddToChatOpen(false);
  }

  const handleLeaveChat = () => {
    LeaveChat(activeChat.chat_id)
    GetChatInfo(activeChat.chat_id)
    setIsConfirmOpen(false)
  }
  const resetAll =()=>{
    setChatsArray([])
    setActiveChat([])
    setChatMessage([])
    logOut()
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
          {chatsArray?.length > 0 ? (
            chatsArray.map((chatRoom, index) => (
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

         <button className="logout-button" onClick={resetAll}>Cerrar sesión</button>
        {activeChat && Object.keys(activeChat).length !== 0? (
          <>
            <div className="chat-header">
              <div className="chat-user">
                <div className="avatar-container">
                  <img
                    src={activeChat.chatRoomImage || user ||  "/placeholder.svg"}
                    alt={activeChat.chat_name}
                    className="avatar"
                  />
                  <button onClick={handleAddToChatOpen}><Plus /></button>
                </div>
                <div className="user-info">
                  <h2>{activeChat.chat_name}</h2>
                </div>
              </div>
            </div>

            <div className="chat-messages">
              {chatTest.length === 0 ? (
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
                    type={msg.message_type}
                    currentUserId={userId}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
              {/* <button onClick={()=>console.log(activeChat)}>buenas</button> */}
            <div className="chat-input">
            { activeChat && activeChat?.participants?.find(e=>e.is_admin === 1)?.user_id === parseInt(userId) ?
              <button className="delete-button" onClick={handleKickModalOpen}><Trash2 /></button> : null
            }
              
              <button className="delete-button" onClick={handleConfirmOpen}><DoorOpen /></button>
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
      {isKickModalOpen ? (<KickChatModal handleCreateModalClose={handleKickModalClose} handleCreateModalSend={handleKickModalSend}/>) : null}
      {isConfirmOpen ? (<ConfirmModal handleCreateModalClose={handleConfirmClose} handleCreateModalSend={handleLeaveChat} action="¿Seguro que quieres salir del chat?" confirmOption="Salir"/>) : null}
      {isAddToChatOpen ? (<AddToChatModal handleCreateModalClose={handleAddToChatClose} handleAddToChatSend={handleAddToChatSend}/>) : null}
    </div>
  )
}

export default ChatRooms
