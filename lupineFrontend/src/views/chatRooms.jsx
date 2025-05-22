import {useContext, useState} from "react";
import lupineLogo from "../img/lupineLogo.png";
import ChatTab from "../components/chatTab";
import "../styles/chatRooms.scss";
import { NavLink } from "react-router-dom";
import { ChatRoomsContext } from "../context/chatRoomsContext";

const ChatRooms = () =>{

    const { getChat } = useContext(ChatRoomsContext);

    const chatRoomsTest = [
    {
        chatRoomName: "Hola",
        chatRoomImage: lupineLogo
    },
    {
        chatRoomName: "Hola",
        chatRoomImage: lupineLogo
    },
    {
        chatRoomName: "Hola",
        chatRoomImage: lupineLogo
    }
]

    return (
    <div className="chatRoomsContainer">
        <div className="sidebar">
            <h1>Chats</h1>
            <div className="searchContainer">
                <input placeholder="Buscar chat" />
            </div>
            <div className="chatList">
                {chatRoomsTest ? (
                    chatRoomsTest.map((chatRoom, index) => (
                        <ChatTab
                            key={index}
                            chatRoomName={chatRoom.chatRoomName}
                            chatRoomImage={chatRoom.chatRoomImage}
                        />
                    ))
                ) : (
                    <> 
                        <h2>Aún no hay chats</h2>
                        <NavLink to="/login">
                            <button>Hola</button>
                        </NavLink>
                    </>
                )}
            </div>
        </div>

        <div className="chatView">
            <NavLink to="/login">
            <button>Siguiente</button>
            </NavLink>
            {/*Aqui va a ir el chat en si*/}
            <h2>Selecciona un chat para comenzar</h2>
        </div>
    </div>
);

}

export default ChatRooms;
