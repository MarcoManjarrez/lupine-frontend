import React, {Suspense} from "react";
import ProfileUpload from "../views/profileUpload";
import ChatRooms from "../views/chatRooms";

const ProfileUpload = React.lazy(() => import("../views/profileUpload"));
const ChatRooms = React.lazy(() => import("../views/chatRooms"));


export const routesConfig = () => [
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