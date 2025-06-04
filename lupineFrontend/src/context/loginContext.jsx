import { createContext, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import server, { endpoints } from "../utils/server";
import { AuthContext } from "./authContext";

export const LoginContext = createContext();

export const LoginProvider = ({children}) =>{

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [userInfo, setUserInfo] = useState();
    const { loggedIn, setLoggedIn } = authContext;

    if (!authContext) {
        throw new Error('LoginProvider must be wrapped in AuthProvider');
    }

    const ValidateUser = useCallback(async (usernameOrEmail, password) =>{
        try{
            const res = await server(
                endpoints.validateUser.route, 
                endpoints.validateUser.method,
                {key: usernameOrEmail.toLowerCase(), password: password}
            );
            if(res.data.response_code === 200){
                setLoggedIn(true);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.user_id);
                console.log(localStorage.getItem("token"));
                navigate("/chatRooms");
            }
        } catch (error) {
            console.error("Error iniciando sesion ", error);
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
                navigate("/login");
            }
        } catch (error) {
            console.error("Error creando usuario ", error);
        }
    }, []);

    const GetUserInfo = (async (usernameOrEmail) =>{
        try{
            let token = localStorage.getItem("auth");
            const res = await server(
                endpoints.getUserInfo.route,
                endpoints.getUserInfo.method,
                {key: usernameOrEmail, token: token}
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
            console.log("Hasta luego");
        } catch (error) {
            console.error("Error cerrando sesion", error);
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