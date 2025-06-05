import { useContext, useState } from "react";
import "../styles/createChatModal.scss";
import { Trash2 } from "lucide-react";
import { ChatRoomsContext } from "../context/chatRoomsContext";

const KickChatModal = ({handleCreateModalClose, handleCreateModalSend}) =>{


    const {RemoveFromChat, activeChat} = useContext(ChatRoomsContext)

   
    const handleRemoveFromChat= (user)=>{
        RemoveFromChat(activeChat.chat_id, user.user_id)///////////////////////////chatId, Participants[]
    }

    function NameHolder(userInfo){
        return(
            <div className="nameHolder">
                <h1>Nombre: {userInfo.user.username}</h1>
                <h1>Id: {userInfo.user.user_id}</h1>
                <button className="delete-button" onClick={()=>handleRemoveFromChat(userInfo.user)}><Trash2 /></button>
            </div>
        )
    }

    return(
        <div className="createChatModal">
            <div className="createChatModal__header">
                <h1>Sacar usuario del chat</h1>
            </div>
            <div className="createChatModal__inputContainer">
             {activeChat.participants ? (activeChat.participants.map((user) => <NameHolder user={user}/>)) : null}
            </div>
            <div className="createChatModal__buttonsContainer">
                <button className="createChatModal__buttonsContainer__cancelButton" onClick={handleCreateModalClose}>Cancelar</button>
                <button className="createChatModal__buttonsContainer__deleteButton" onClick={handleCreateModalSend}>Sacar</button>
            </div>
        </div>
    );

};

export default KickChatModal;