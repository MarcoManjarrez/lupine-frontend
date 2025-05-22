import { useState, useContext } from 'react'
import lupineLogo from "../img/lupineLogo.png"
import "../styles/login.scss"
import { LoginContext } from '../context/loginContext'
import { useNavigate } from 'react-router-dom'

  const Login = () => {
  const { LoginCall, navigateTo } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    LoginCall(username, password);
  }

  const handleEnter = (e) => {
    e.preventDefault();
    navigateTo("/chatRooms");
  }

  const handleRegister = (e) => {
    e.preventDefault();
    navigateTo("/profileUpload");
  }

  return (
    <div className='loginContainer'>
      <div className='loginContainer__logoHolder'>
        <img src={lupineLogo} alt="logo"/>
        <h1>¿Ya tienes cuenta?</h1>
      </div>
      
      <form className='loginContainer__userPassAnimation' onSubmit={handleLogin}>
        <div className='loginContainer__userPassContainer'>
          <h2>Inicia Sesion</h2>
          <input 
            placeholder='Usuario' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            placeholder='Contraseña' 
            type='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>

      <div className='loginContainer__registerContainer'>
        <button onClick={handleEnter}>Entrar</button>
        <h5>O registrate</h5>
        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  )
}

export default Login
