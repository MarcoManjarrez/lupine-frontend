import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/authContext';
import './index.css'
import App from './App.jsx'
import { LoginProvider } from './context/loginContext.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
      <App/>
  </StrictMode>

)
