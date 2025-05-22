import { createContext, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import server, { endpoints } from "../utils/server";
import { AuthContext } from "./authContext";

export const LoginContext = createContext();

export const LoginProvider = ({children}) =>{

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('LoginProvider must be wrapped in AuthProvider');
    }

    const { loggedIn, setLoggedIn } = authContext;
    const navigate = useNavigate();

    const LoginCall = useCallback(async (username, password) =>{
        try{
            const res = await server(
                endpoints.login.route, 
                endpoints.login.method,
                { username: username, password: password}
            );
            if(res.message){
                setLoggedIn(true);
                navigate("/chatRooms");
            }
        } catch (error_message) {
            console.error(error_message);
        }
    }, [navigate, setLoggedIn]);

    const LogoutCall = useCallback(async (username, password) =>{
        try{
            const res = await server(
                endpoints.logout.route, 
                endpoints.logout.method,
                { username: username, password: password}
            );
            if(res.message){
                setLoggedIn(false);
                navigate("/chatRooms");
            }
        } catch (error_message) {
            console.error(error_message);
        }
    }, []);

    const navigateTo = useCallback((path) => {
        setLoggedIn(true);
        navigate(path);
    }, [navigate]);

    const SignInCall = useCallback(async (username, email, password) =>{
        try{
            const res = await server(
                endpoints.logout.route, 
                endpoints.logout.method,
                { operation_type: 0, username: username, email: email, password: password}
            );
            if(res.message){
                setLoggedIn(true);
                navigate("/chatRooms");
            }
        } catch (error_message) {
            console.error(error_message);
        }
    }, []);

    return(
        <LoginContext.Provider value={{ LoginCall, LogoutCall, SignInCall, navigateTo }}>
            {children}
        </LoginContext.Provider>
    );
  
}