import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { routesConfig } from "../config/routesConfig"
import "../styles/loading.scss"

// Loading fallback component
const Loading = ({ mensaje }) => (
  <div className="loading-fallback">
    <div className="spinner"></div>
    <p>{mensaje || "Cargando..."}</p>
  </div>
)

const MainPage = () => {
  const routes = routesConfig()

  // You can add your sessionReceived check here
  const sessionReceived = true // Replace with your actual session check

  if (!sessionReceived) {
    return <Loading mensaje="Cargando sesión..." />
  }

  return (
    <div className="mainPage">
      {/* You can add your NavBar component here */}
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </div>
  )
}

export default MainPage
