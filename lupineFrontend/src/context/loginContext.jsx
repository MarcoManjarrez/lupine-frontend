import { createContext, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import server, { endpoints } from "../utils/server";
import { AuthContext } from "./authContext";
import { message } from "antd";

export const LoginContext = createContext();

export const LoginProvider = ({children}) =>{

    const authContext = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState();
    const { loggedIn, setLoggedIn } = authContext;
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    if (!authContext) {
        throw new Error('LoginProvider must be wrapped in AuthProvider');
    }

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

    const ValidateUser = useCallback(async (usernameOrEmail, password) =>{
        try{
            const res = await server(
                endpoints.validateUser.route, 
                endpoints.validateUser.method,
                {key: usernameOrEmail, password: password}
            );
            if(res.data.response_code === 200){
                setLoggedIn(true);
                navigate("/chatRooms");
            }
            console.log(res.response_code);
        } catch (error) {
            handleError("Error iniciando sesion ", error);
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
            handleSuccess("Bienvenido");
        } catch (error) {
            handleError("Error creando usuario ", error);
        }
    }, []);

    const GetUserInfo = (async (usernameOrEmail) =>{
        try{
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
           handleError(error);
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
            handleSuccess("Hasta luego");
        } catch (error) {
            handleError("Error cerrando sesion", error);
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