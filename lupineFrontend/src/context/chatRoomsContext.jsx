import { createContext, useState, useCallback } from "react";
import { endpoints } from "../utils/server";

export const ChatRoomsContext = createContext();

export const ChatRoomsProvider = ({children}) =>{

    const [chat, setChat] = useState({});
    const [chats, setChats] = useState({});
    
    const GetChat = useCallback(async (userId, destination, chatId, lastUpdate) =>{
        try{
            const res = await server(
                endpoints.getChat.route,
                endpoints.getChat.method,
                {operation_type: 0, user_id: userId, destination: destination, 
                chat_id: chatId, last_update: lastUpdate}
            ); 
            if(res.message){
                setChat(res);
            }
        } catch (error_message){
            console.log(error_message);
        }
      },[]);

    const GetChats = useCallback(async (userId, lastUpdate) =>{
        try{
            const res = await server(
                endpoints.getChats.route,
                endpoints.getChats.method,
                {operation_type: 0, user_id: userId, last_update: lastUpdate}
            ); 
            if(res.message){
                setChats(res);
            }
        } catch (error_message){
            console.log(error_message);
        }
      },[]);

    const AddToChat = useCallback(async (adminId, userId) =>{
        try{
            const res = await server(
                endpoints.getChats.route,
                endpoints.getChats.method,
                {operation_type: 0, admin_id: adminId, userId: userId}
            ); 
        } catch (error_message){
            console.log(error_message);
        }
      },[]);

    const CreateGroupChat = useCallback(async (adminId, chatName, participantIds) =>{
        try{
            const res = await server(
                endpoints.getChats.route,
                endpoints.getChats.method,
                {operation_type: 0, admin_id: adminId, chat_name: chatName, participant_ids: participantIds}
            ); 
        } catch (error_message){
            console.log(error_message);
        }
      },[]);

    const SendMessage = useCallback(async (userId, message) =>{
        try{
            const res = await server(
                endpoints.getChats.route,
                endpoints.getChats.method,
                {operation_type: 0, user_id: userId, message: message}
            ); 
        } catch (error_message){
            console.log(error_message);
        }
      },[]);

    const LeaveChat = useCallback(async (userId, chatId) =>{
        try{
            const res = await server(
                endpoints.getChats.route,
                endpoints.getChats.method,
                {operation_type: 0, user_id: userId, chat_id: chat_id}
            ); 
        } catch (error_message){
            console.log(error_message);
        }
      } ,[]);

    return(
        <ChatRoomsContext.Provider value={{ chat, setChat, GetChat, chats, setChats, GetChats, AddToChat, CreateGroupChat, SendMessage, LeaveChat}}>
            {children}
        </ChatRoomsContext.Provider>
    );
}