import { createContext, useState, useCallback } from "react";
import server, { endpoints } from "../utils/server";
import { message } from "antd";

export const ChatRoomsContext = createContext();

export const ChatRoomsProvider = ({children}) =>{
    const [messageApi, contextHolder] = message.useMessage();

    const handleSuccess = (successMessage) =>{
        messageApi.open({
            type: 'success',
            content: successMessage,
            style: {
                backgroundColor: "#5865f2",
            },
        });
    }

    const handleError = (errorMessage) =>{
        messageApi.open({
            type: 'error',
            content: errorMessage,
            style: {
                backgroundColor: "#5865f2",
            },
        });
    }
    
    
    const [chatMessage, setChatMessage] = useState([]);
    const [chats, setChats] = useState([]);
    
    const CreateGroupChat = useCallback(async (chatName, createdBy, participantIds) =>{
        try{
            let token = localStorage.getItem("auth");
            const res = await server(
                endpoints.createGroupChat.route,
                endpoints.createGroupChat.method,
                {is_group: true, chat_name: chatName, created_by: createdBy, participant_ids: participantIds, token: token}
            ); 
            if(res.data.response_code == 200){
                handleSuccess("Chat creado con exito");
            }
        } catch (error){
            handleError("Error creando el chat ", error);
        }
    },[]);
    
    const AddToGroupChat = useCallback(async (chatId, addedBy, participantIds) =>{
        try{
            let token = localStorage.getItem("auth");
            const res = await server(
                endpoints.addToChat.route,
                endpoints.addToChat.method,
                {chat_id: chatId, added_by: addedBy, participant_ids: participantIds, token: token}
            ); 
            if(res.data.response_code == 200){
                handleSuccess("Usuario añadido con exito");
            }
        } catch (error){
            handleError("Error añadiendo al usuario al grupo ", error);
        }
    },[]);

    const GetChatMessages = useCallback(async (chatId, lastUpdateTimestamp) =>{
        try{
            let token = localStorage.getItem("auth");
            const res = await server(
                endpoints.getChatMessages.route,
                endpoints.getChatMessages.method,
                {chat_id: chatId, last_update_timestamp: lastUpdateTimestamp, token: token}
            ); 
            console.log(res);    
            if(res.data.response_code === 200){
                setChatMessage(res.data.messages_array);
            }
        } catch (error){
            handleError("Error al conseguir mensajes ", error);
        }
    },[]);

    const GetChats = useCallback(async (lastUpdate) =>{
        try{
            let token = localStorage.getItem("auth");
            let userId = localStorage.getItem("userId");
            const res = await server(
                endpoints.getChats.route,
                endpoints.getChats.method,
                {user_id: userId, last_update_timestamp: lastUpdate, token: token}
            ); 
            if(res.response_code === 200){
                setChats(res);
            }
        } catch (error){
            handleError("Error encontrando chats ", error);
        }
    },[]);

    const SendMessage = useCallback(async (chatId, sender_id, content) =>{
        try{
            let token = localStorage.getItem("auth");
            let senderId = localStorage.getItem("userId");
            const res = await server(
                endpoints.sendMessage.route,
                endpoints.sendMessage.method,
                {sender_id: senderId, content: content, chat_id: chatId, message_type : "text", token: token}
            ); 
            console.log(res)
            GetChatMessages(chat_id)
        } catch (error){
            handleError("Error enviando el mensaje ", error);
        }
      },[]);

    const LeaveChat = useCallback(async (chatId) =>{
        try{
            let userId = localStorage.getItem("userId");
            const res = await server(
                endpoints.leaveChat.route,
                endpoints.leaveChat.method,
                {user_id: userId, chat_id: chatId}
            ); 
            if(res.response_code === 200){
                handleSuccess("Usuario sacado del chat");
            }
        } catch (error){
            handleError("Error eliminando a usuario, vuelva a intentarlo", error);
        }
      } ,[]);

    return(
        <ChatRoomsContext.Provider value={{ chatMessage, setChatMessage, GetChatMessages, chats, setChats, GetChats, AddToGroupChat, CreateGroupChat, SendMessage, LeaveChat}}>
            {children}
        </ChatRoomsContext.Provider>
    );
}