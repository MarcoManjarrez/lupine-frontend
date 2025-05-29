"use client"

import { useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import LupineImage from "../img/lupineImage.png"
import { EditOutlined } from "@ant-design/icons"
import { LoginContext } from "../context/loginContext"
import "../styles/profileUpload.scss"

const ProfileUpload = () => {
  const { CreateUser } = useContext(LoginContext)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSignInCall = (e) => {
    e.preventDefault()
    CreateUser(username, email, password)
  }

  return (
    <div className="profileUploadContainer">
      <div className="profileUploadContainer__imageContainer">
        <img src={LupineImage || "/placeholder.svg"} alt="Profile" />
        <button className="profileUploadContainer__imageContainer__editButton">
          <EditOutlined />
        </button>
      </div>
      <h2>¡Bienvenido a Lupine!</h2>

      <h1>Correo</h1>
      <input placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />

      <h1>Nombre de usuario</h1>
      <input placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />

      <h1>Contraseña</h1>
      <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleSignInCall}>Registrarse</button>

      <NavLink to="/chatRooms">
        <button>Siguiente</button>
      </NavLink>
    </div>
  )
}

export default ProfileUpload
