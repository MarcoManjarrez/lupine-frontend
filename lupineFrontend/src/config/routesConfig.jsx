import React, { Suspense } from "react"

// Use lazy loading for all components
const MainPage = React.lazy(() => import("../views/mainPage"))
const ProfileUpload = React.lazy(() => import("../views/ProfileUpload"))
const ChatRooms = React.lazy(() => import("../views/ChatRooms"))
const Login = React.lazy(() => import("../views/Login"))

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="spinner"></div>
    <p>Cargando...</p>
  </div>
)

export const routesConfig = () => [
  {
    path: "/mainPage",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/profileUpload",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProfileUpload />
      </Suspense>
    ),
  },
  {
    path: "/chatRooms",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ChatRooms />
      </Suspense>
    ),
  },
]
