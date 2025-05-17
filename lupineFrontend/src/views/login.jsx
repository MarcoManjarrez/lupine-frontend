import { useState } from 'react'
import lupineLogo from "../img/lupineLogo.png"
import "../styles/login.scss"

const Login = () => {

  return (
    <>
      <div className='loginContainer'>
        <div className='loginContainer__logoHolder'>
          <img src={lupineLogo} alt="logo"/>
          <h1>¿Ya tienes cuenta?</h1>
        </div>
        <div className='loginContainer__userPassAnimation'>
          <div className='loginContainer__userPassContainer'>
            <h2>Inicia Sesion</h2>
            <input placeholder='Usuario'/>
            <input placeholder='Contraseña'/>
        </div>
        </div>
        <div className='loginContainer__registerContainer'>
          <h5>O registrate</h5>
          <button>Registrarse</button>
        </div>
      </div>
    </>
  )
}

export default Login
