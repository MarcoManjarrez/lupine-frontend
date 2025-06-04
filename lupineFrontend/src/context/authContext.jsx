import { createContext, useState, useEffect, useContext } from "react";
import server, { endpoints } from "../utils/server";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem("auth");
        const userId = localStorage.getItem("userId");
        if (token) {
            onSuccessfulLogin(token, userId);
        }

        const handleLogout = () => {
            localStorage.setItem("auth", "");
            setLoggedIn(false);
        };

        window.addEventListener("remove", handleLogout);

        return () => {
            window.removeEventListener("remove", handleLogout);
        };
    }, []);

    const onSuccessfulLogin = ({ accessToken, userId }) => {
        setLoggedIn(true);

        localStorage.setItem("auth", accessToken);
        localStorage.setItem("userId", userId);
    };

    const logOut = () => {
        server(endpoints.logout.route, endpoints.logout.method).then((res) => {
        if (res.error_message) return;

        setLoggedIn(false);

        localStorage.removeItem("auth");
        });
    };

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, onSuccessfulLogin, logOut }}>
        {children}
        </AuthContext.Provider>
    );

}