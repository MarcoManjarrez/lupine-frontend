import { useContext, useEffect, useState } from "react";
import "../styles/createChatModal.scss";
import { ChatRoomsContext } from "../context/chatRoomsContext";
import { LoginContext } from "../context/loginContext";


const CreateChatModal = ({handleCreateModalClose, handleCreateModalSend}) =>{

    const {} = useContext(ChatRoomsContext);
    const {userInfo, setUserInfo, GetUserInfo} = useContext(LoginContext)
    const {CreateGroupChat} = useContext(ChatRoomsContext)
    const [userInfoArray, setUserInfoArray] = useState([]);
    const [username, setUsername] = useState("");
    const [chatName, setChatName] = useState("")

    useEffect(() => { 
        if(userInfo){
            setUserInfoArray((prev)=>[
                ...prev, 
                {id: userInfo.id, username: userInfo.username}
            ])
        }
        },[userInfo])
        
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

    const onAddUserChange = (e) =>{
        setUsername(e.target.value);
    }

    const handleGetUser = () =>{
        if(username !== null){
            GetUserInfo(username);
        }
        // console.log(userInfo)
        // if(userInfo){
        //     setUserInfoArray([
        //         ...userInfoArray,
        //         {id: userInfo.id, username: userInfo.username,}
        //     ])
        // }
    }
    const changeChatName = (e)=>{
        setChatName(e.target.value)
    }

    const handleCreateChat = ()=>{
        CreateGroupChat(chatName, userInfoArray.map((e)=>e.id))
        handleCreateModalSend
    }



    return(
        <div className="createChatModal">
            <div className="createChatModal__header">
                <h1>Crear chat</h1>
            </div>
            <input placeholder="Nombre del chat" onChange={(e)=> changeChatName(e)}/>
            <input placeholder="Buscar usuarios" onChange={(e)=> onAddUserChange(e)}/>
            <button onClick={handleGetUser}>Agregar</button>
            <div className="createChatModal__inputContainer">
             {userInfoArray ? (userInfoArray.map((user) => <NameHolder user={user}/>)) : null}
            </div>
            <div className="createChatModal__buttonsContainer">
                <button className="createChatModal__buttonsContainer__cancelButton" onClick={handleCreateModalClose}>Cancelar</button>
                <button className="createChatModal__buttonsContainer__createButton" onClick={handleCreateChat}>Crear</button>
            </div>
        </div>
    );

};

export default CreateChatModal;