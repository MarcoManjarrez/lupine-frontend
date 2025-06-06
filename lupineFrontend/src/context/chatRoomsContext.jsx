import { createContext, useState, useCallback } from "react";
import { endpoints } from "../utils/server";

export const ChatRoomsContext = createContext();

export const ChatRoomsProvider = ({children}) =>{

    const [chatMessage, setChatMessage] = useState({});
    const [chats, setChats] = useState({});
    
    const GetChatMessages = useCallback(async (chatId, lastUpdate) =>{
        try{
            const res = await server(
                endpoints.getChatMessages.route,
                endpoints.getChatMessages.method,
                {chat_id: chatId, last_update: lastUpdate}
            ); 
            if(res.response_code === 200){
                setChatMessage(res);
            }
        } catch (error){
            console.log(error);
        }
      },[]);

    const GetChats = useCallback(async (userId, lastUpdate) =>{
        try{
            let token = localStorage.getItem("auth");
            const res = await server(
                endpoints.getChats.route,
                endpoints.getChats.method,
                {user_id: userId, last_update: lastUpdate, token: token}
            ); 
            if(res.response_code === 200){
                setChats(res);
            }
        } catch (error){
            console.log(error);
        }
      },[]);

    const AddToChat = useCallback(async (chatId, addedBy, participantIds ) =>{
        try{
            let token = localStorage.getItem("auth");
            const res = await server(
                endpoints.addToChat.route,
                endpoints.addToChat.method,
                {chat_id: chatId, added_by: addedBy, participant_ids: participantIds, token: token}
            ); 
            console.log(res);
        } catch (error){
            console.log(error_message);
        }
      },[]);

    const CreateGroupChat = useCallback(async (chatName, createdBy) =>{
        try{
            const res = await server(
                endpoints.createGroupChat.route,
                endpoints.createGroupChat.method,
                {is_group: true, chat_name: chatName, created_by: createdBy}
            ); 
        } catch (error_message){
            console.log(error_message);
        }
      },[]);

    const SendMessage = useCallback(async (userId, message) =>{
        try{
            const res = await server(
                endpoints.sendMessage.route,
                endpoints.sendMessage.method,
                {user_id: userId, message: message}
            ); 
        } catch (error_message){
            console.log(error_message);
        }
      },[]);

    const LeaveChat = useCallback(async (userId, chatId) =>{
        try{
            const res = await server(
                endpoints.leaveChat.route,
                endpoints.leaveChat.method,
                {user_id: userId, chat_id: chatId}
            ); 
            if(res.response_code === 200){
                console.log(res);
            }
        } catch (error_message){
            console.log(error_message);
        }
      } ,[]);

    return(
        <ChatRoomsContext.Provider value={{ chatMessage, setChatMessage, GetChatMessages, chats, setChats, GetChats, AddToChat, CreateGroupChat, SendMessage, LeaveChat}}>
            {children}
        </ChatRoomsContext.Provider>
    );
}