import { useState } from 'react'
import lupineLogo from "../img/lupineLogo.png"
import "../styles/login.scss"

const Login = () => {

  return (
    <>
      <div className='loginContainer'>
        <img src={lupineLogo} alt="logo"/>
        <h1>¿Ya tienes cuenta?</h1>
       
        <div className='loginContainer__userPassContainer'>
          <h2>Inicia Sesion</h2>
          <input placeholder='Usuario'/>
          <input placeholder='Contraseña'/>
        </div>
        <div>
          <h5>O registrate</h5>
          <button>Registrarse</button>
        </div>
      </div>
    </>
  )
}

export default Login
