import { useContext, useEffect, useState } from "react";
import "../styles/createChatModal.scss";
import { ChatRoomsContext } from "../context/chatRoomsContext";
import { LoginContext } from "../context/loginContext";


const AddToChatModal = ({handleCreateModalClose, handleCreateModalSend}) =>{

    const {AddToGroupChat , activeChat} = useContext(ChatRoomsContext);
    const {userInfo, setUserInfo, GetUserInfo} = useContext(LoginContext)
    const [userInfoArray, setUserInfoArray] = useState([]);
    const [username, setUsername] = useState("");
    const [chatName, setChatName] = useState("")

    useEffect(() => { 
        if(userInfo){
            console.log(userInfo)
            setUserInfoArray((prev)=>[
                ...prev, 
                {id: userInfo.user_id, username: userInfo.username}
            ])
        }
        },[userInfo])

    function NameHolder(userInfo){
        return(
            <div className="nameHolder">
                <h1>Nombre: {userInfo.user.username}</h1>
                <h1>Id: {userInfo.user.id}</h1>
            </div>
        )
    }

    const onAddUserChange = (e) =>{
        setUsername(e.target.value);
    }

    const handleGetUser = () =>{
        if(username !== null){
            GetUserInfo(username);
        }
    }


    const handleAddToChat = ()=>{
        AddToGroupChat(activeChat.chat_id, userInfoArray.map((e)=>e.id))
        handleCreateModalSend
    }



    return(
        <div className="createChatModal">
            <div className="createChatModal__header">
                <h1>Anadir usuarios al chat</h1>
            </div>
            <input placeholder="Buscar usuarios" onChange={(e)=> onAddUserChange(e)}/>
            <button onClick={handleGetUser}>Agregar</button>
            <div className="createChatModal__inputContainer">
             {userInfoArray ? (userInfoArray.map((user) => <NameHolder user={user}/>)) : null}
            </div>
            <div className="createChatModal__buttonsContainer">
                <button className="createChatModal__buttonsContainer__cancelButton" onClick={handleCreateModalClose}>Cancelar</button>
                <button className="createChatModal__buttonsContainer__createButton" onClick={handleAddToChat}>Anadir</button>
            </div>
        </div>
    );

};

export default AddToChatModal;