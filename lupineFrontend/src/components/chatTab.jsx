import {useState} from "react";
import "../styles/chatTab.scss";

const ChatTab = ({chatRoomName, chatRoomImage}) =>{
    return(
        <>
          <div className="chatTabContainer">
            <div className="chatTabContainer__titleMessage">
                <h2>{chatRoomName}</h2>
                <h3>ultimo mensaje</h3>
            </div>
                <img src={chatRoomImage}/>
          </div>
        </>
    );
}

export default ChatTab;