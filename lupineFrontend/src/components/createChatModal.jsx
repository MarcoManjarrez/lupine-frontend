import { useState } from "react";
import "../styles/createChatModal.scss";

const CreateChatModal = ({handleCreateModalClose, handleCreateModalSend}) =>{

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
    ];

    function NameHolder(userInfo){
        return(
            <div className="nameHolder">
                <h1>Nombre: {userInfo.user.name}</h1>
                <h1>Id: {userInfo.user.id}</h1>
            </div>
        )
    }

    return(
        <div className="createChatModal">
            <div className="createChatModal__header">
                <h1>Crear chat</h1>
            </div>
            <div className="createChatModal__inputContainer">
             {testUsers ? (testUsers.map((user) => <NameHolder user={user}/>)) : null}
            </div>
            <input/>
            <div className="createChatModal__buttonsContainer">
                <button className="createChatModal__buttonsContainer__cancelButton" onClick={handleCreateModalClose}>Cancelar</button>
                <button className="createChatModal__buttonsContainer__createButton" onClick={handleCreateModalSend}>Crear</button>
            </div>
        </div>
    );

};

export default CreateChatModal;