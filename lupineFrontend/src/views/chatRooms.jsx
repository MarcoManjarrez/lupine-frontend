import {useState} from "react";
import lupineLogo from "../img/lupineLogo.png";
import ChatTab from "../components/chatTab";
import "../styles/chatRooms.scss";

const ChatRooms = () =>{
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
                    chatRoomsTest.map((chatRoom) => (
                        <ChatTab
                            key={chatRoom.id}
                            chatRoomName={chatRoom.chatRoomName}
                            chatRoomImage={chatRoom.chatRoomImage}
                        />
                    ))
                ) : (
                    <h2>Aún no hay chats</h2>
                )}
            </div>
        </div>

        <div className="chatView">
            {/*Aqui va a ir el chat en si*/}
            <h2>Selecciona un chat para comenzar</h2>
        </div>
    </div>
);

}

export default ChatRooms;
