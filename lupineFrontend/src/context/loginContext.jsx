import { createContext, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import server, { endpoints } from "../utils/server";
import { AuthContext } from "./authContext";

export const LoginContext = createContext();

export const LoginProvider = ({children}) =>{

    const authContext = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState();

    if (!authContext) {
        throw new Error('LoginProvider must be wrapped in AuthProvider');
    }

    const { loggedIn, setLoggedIn } = authContext;
    const navigate = useNavigate();

    const ValidateUser = useCallback(async (username, password) =>{
        try{
            const res = await server(
                endpoints.validateUser.route, 
                endpoints.validateUser.method,
                {username: username, password: password}
            );
            if(res.response_code === 200){
                setLoggedIn(true);
                navigate("/chatRooms");
            }
            console.log(res.response_code);
        } catch (error) {
            console.error(error);
        }
    }, [navigate, setLoggedIn]);

     const CreateUser = useCallback(async (username, email, password) =>{
        try{
            const res = await server(
                endpoints.createUser.route, 
                endpoints.createUser.method,
                {username: username, email: email, password: password}
            );
            console.log(res)
            if(res.data.response_code === 200){
                setLoggedIn(true);
                navigate("/chatRooms");
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const GetUserInfo = (async (key) =>{
        try{
            const res = await server(
                endpoints.getUserInfo.route,
                endpoints.getUserInfo.method,
                {key: key, token:token}
            );
            console.log(res.data);
            if(res.data.response_code === 200){
                setUserInfo(res);
            }
        } catch (error){
            console.error(error);
        }
    });

    const LogoutCall = useCallback(async (username, password) =>{
        try{
            const res = await server(
                endpoints.logout.route, 
                endpoints.logout.method,
                {username: username, password: password}
            );
            if(res.message){
                setLoggedIn(false);
                navigate("/chatRooms");
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const navigateTo = useCallback((path) => {
        setLoggedIn(true);
        navigate(path);
    }, [navigate]);


    return(
        <LoginContext.Provider value={{ ValidateUser, CreateUser, LogoutCall, navigateTo, userInfo, setUserInfo, GetUserInfo }}>
            {children}
        </LoginContext.Provider>
    );
  
}