import { useContext, useState } from "react";
import "../styles/createChatModal.scss";
import { Trash2 } from "lucide-react";
import { ChatRoomsContext } from "../context/chatRoomsContext";

const KickChatModal = ({handleCreateModalClose, handleCreateModalSend}) =>{


    const {RemoveFromChat} = useContext(ChatRoomsContext)

    const testUsers =[
        {
            id:0,
            name: "Boboboman"
        },
        {
            id:2,
            name: "PoPoPoman"
        },
        {
            id:3,
            name: "Bocch"
        },
        {
            id:4,
            name: "Roca"
        },
        {
            id:5,
            name: "Roca"
        },
        {
            id:6,
            name: "Roca"
        },
        {
            id:7,
            name: "Roca"
        },
        {
            id:8,
            name: "Roca"
        },
    ];

    const handleRemoveFromChat= ()=>{
        // RemoveFromChat()///////////////////////////chatId, Participants[]
    }

    function NameHolder(userInfo){
        return(
            <div className="nameHolder">
                <h1>Nombre: {userInfo.user.name}</h1>
                <h1>Id: {userInfo.user.id}</h1>
                <button className="delete-button" onClick={handleRemoveFromChat}><Trash2 /></button>
            </div>
        )
    }

    return(
        <div className="createChatModal">
            <div className="createChatModal__header">
                <h1>Sacar usuario del chat</h1>
            </div>
            <div className="createChatModal__inputContainer">
             {testUsers ? (testUsers.map((user) => <NameHolder user={user}/>)) : null}
            </div>
            <div className="createChatModal__buttonsContainer">
                <button className="createChatModal__buttonsContainer__cancelButton" onClick={handleCreateModalClose}>Cancelar</button>
                <button className="createChatModal__buttonsContainer__deleteButton" onClick={handleCreateModalSend}>Sacar</button>
            </div>
        </div>
    );

};

export default KickChatModal;