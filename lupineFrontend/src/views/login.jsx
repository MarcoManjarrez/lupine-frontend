import { useState, useContext, useEffect } from "react"
import lupineLogo from "../img/lupineLogo.png"
import "../styles/login.scss"
import { LoginContext } from "../context/loginContext"

const Login = () => {
  const { ValidateUser, navigateTo } = useContext(LoginContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => { 
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
  },[])

  const handleLogin = (e) => {
    e.preventDefault();
    if(username && password){
      ValidateUser(username, password)
    } else {
      console.log("Campos sin llenar");
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    navigateTo("/profileUpload")
  }

  return (
    <div className="loginContainer">
      <div className="loginContainer__logoHolder">
        <img src={lupineLogo || "/placeholder.svg"} alt="logo" />
        <h1>¿Ya tienes cuenta?</h1>
      </div>

      <form className="loginContainer__userPassAnimation" onSubmit={handleLogin}>
        <div className="loginContainer__userPassContainer">
          <h2>Inicia Sesión</h2>
          <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>

      <div className="loginContainer__registerContainer">
        <button onClick={handleLogin}>Entrar</button>
        <h5>O regístrate</h5>
        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  )
}

export default Login
