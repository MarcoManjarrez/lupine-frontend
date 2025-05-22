import './App.css'
import ChatRooms from './views/chatRooms';
import Login from './views/login';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/authContext';
import { LoginProvider } from './context/loginContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ProfileUpload from './views/profileUpload';
import { ChatRoomsProvider } from './context/chatRoomsContext';


function AppContent() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/chatRooms"
        element={loggedIn ? <ChatRooms /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profileUpload"
        element={loggedIn ? <ProfileUpload /> : <Navigate to="/login" replace />}
      />
      <Route
        path="*"
        element={<Navigate to={loggedIn ? "/chatRooms" : "/login"} replace />}
      />
    </Routes>
  );
}

function App(){

  return (
    <>
      <Router>
        <AuthProvider>
          <LoginProvider>
            <ChatRoomsProvider>
             <AppContent/>
            </ChatRoomsProvider>
          </LoginProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
