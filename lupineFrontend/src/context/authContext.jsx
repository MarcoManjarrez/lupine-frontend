import { createContext, useState, useEffect, useContext } from "react";
import server, { endpoints } from "../utils/server";
import {useNavigate} from "react-router-dom"

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (token && userId) {
            onSuccessfulLogin(token, userId);
        }

        const handleLogout = () => {
            localStorage.setItem("token", "");
            setLoggedIn(false);
        };

        window.addEventListener("remove", handleLogout);

        return () => {
            window.removeEventListener("remove", handleLogout);
        };
    }, []);

    const onSuccessfulLogin = ({ accessToken, userId }) => {
        setLoggedIn(true);
        navigate("/chatRooms")

        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", userId);
    };

    const logOut = () => {
        setLoggedIn(false);
        localStorage.removeItem("token");
      
    };

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, onSuccessfulLogin, logOut }}>
        {children}
        </AuthContext.Provider>
    );

}