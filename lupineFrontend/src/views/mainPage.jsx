import { Suspense, useEffect, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';


const MainPage = () => {
    const routes = routesConfig();
    if (!sessionReceived) {
        return <Loading mensaje="Cargando..."/>; 
    }
    return (
        <div className="mainPage">
            
            <NavBar />
            <Suspense>
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
    );
}

export default MainPage;
