import React, {Suspense} from "react";
import MainPage from "../views/mainPage";

const ProfileUpload = React.lazy(() => import("../views/profileUpload"));
const ChatRooms = React.lazy(() => import("../views/chatRooms"));
const Login = React.lazy(()=> import("../views/login"));
const MainPage = React.lazy(()=> import("../views/login"));

export const routesConfig = () => [
    {
        path: "/mainPage",
        element: (
        <Suspense>
            <MainPage/>
        </Suspense>
        )
    },
    {
        path: "/login",
        element: (
            <Suspense>
                <Login /> 
            </Suspense>
        )
    },
    {
        path: "/profileUpload",
        element: (
            <Suspense>
                <ProfileUpload /> 
            </Suspense>
        )
    },
    {
        path: "/chatRooms",
        element: (
            <Suspense>
                <ChatRooms />
            </Suspense>
        ) 
    },
]