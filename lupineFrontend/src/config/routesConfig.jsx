import React, {Suspense} from "react";

const ProfileUpload = React.lazy(() => import("../views/profileUpload"));
const ChatRooms = React.lazy(() => import("../views/chatRooms"));
const Login = React.lazy(()=> import("../views/login"));

export const routesConfig = () => [
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