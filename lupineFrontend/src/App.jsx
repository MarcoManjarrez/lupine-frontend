
import { Route, Routes, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useContext } from 'react';
import { useState } from 'react'
import Login from './views/login'
import ProfileUpload from './views/profileUpload'
import ChatRooms from './views/chatRooms'
import './App.css'
import { routesConfig } from './config/routesConfig';

function App() {
  const routes = routesConfig();
  return (
    <>
      <div>
        <Suspense >
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </Suspense>
      </div>
    </>
  )
}

export default App
