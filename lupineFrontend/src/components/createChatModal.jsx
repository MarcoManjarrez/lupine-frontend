import { useContext, useState } from "react";
import "../styles/createChatModal.scss";
import { ChatRoomsContext } from "../context/chatRoomsContext";


const CreateChatModal = ({handleCreateModalClose, handleCreateModalSend}) =>{

    const { GetUserInfo, userInfo, setUserInfo} = useContext(ChatRoomsContext);
    const [userInfoArray, setUserInfoArray] = useState([]);
    const [username, setUsername] = useState("");

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
        if(userInfo){
            setUserInfoArray({
                ...userInfoArray,
                id: userInfo.id, username: userInfo.username,
            })
        }
    }

    return(
        <div className="createChatModal">
            <div className="createChatModal__header">
                <h1>Crear chat</h1>
            </div>
            <input placeholder="Nombre del chat"/>
            <input placeholder="Buscar usuarios" onChange={(e) => onAddUserChange(e)}/>
            <button onClick={handleGetUser}>Agregar</button>
            <div className="createChatModal__inputContainer">
             {userInfoArray ? (userInfoArray.map((user) => <NameHolder user={user}/>)) : null}
            </div>
            <div className="createChatModal__buttonsContainer">
                <button className="createChatModal__buttonsContainer__cancelButton" onClick={handleCreateModalClose}>Cancelar</button>
                <button className="createChatModal__buttonsContainer__createButton" onClick={handleCreateModalSend}>Crear</button>
            </div>
        </div>
    );

};

export default CreateChatModal;