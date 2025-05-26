"use client"

import "./App.css"
import { useContext } from "react"
import { AuthContext, AuthProvider } from "./context/authContext"
import { LoginProvider } from "./context/loginContext"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ChatRoomsProvider } from "./context/chatRoomsContext"
import "./styles/global.scss"
import "./styles/loading.scss"

// Import with React.lazy
import React, { Suspense } from "react"
const ChatRooms = React.lazy(() => import("./views/ChatRooms"))
const Login = React.lazy(() => import("./views/Login"))
const ProfileUpload = React.lazy(() => import("./views/ProfileUpload"))
const MainPage = React.lazy(() => import("./views/mainPage"))

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="spinner"></div>
    <p>Cargando...</p>
  </div>
)

function AppContent() {
  const { loggedIn } = useContext(AuthContext)

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/mainPage/*" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatRooms" element={loggedIn ? <ChatRooms /> : <Navigate to="/login" replace />} />
        <Route path="/profileUpload" element={<ProfileUpload />} />
        <Route path="*" element={<Navigate to={loggedIn ? "/chatRooms" : "/login"} replace />} />
      </Routes>
    </Suspense>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LoginProvider>
          <ChatRoomsProvider>
            <AppContent />
          </ChatRoomsProvider>
        </LoginProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
