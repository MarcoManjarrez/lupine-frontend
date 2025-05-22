import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import LupineImage from "../img/lupineImage.png";
import { EditOutlined } from "@ant-design/icons";
import { LoginContext } from "../context/loginContext";
import "../styles/profileUpload.scss";

const ProfileUpload = () => {
    const { SignInCall } = useContext(LoginContext);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignInCall = (e) =>{
        e.preventDefault();
        SignInCall(username, email, password);
    }


    return (
        <>
            <div className="profileUploadContainer">
                <div className="profileUploadContainer__imageContainer">
                    <img src={LupineImage} alt="image" />
                </div>
                <h2>¡Bienvenido a Lupine!</h2>
                <h1>Correo</h1>
                <input placeholder='ejemplo@correo.com' />
                <h1>Nombre de usuario</h1>
                <input placeholder='Nombre de usuario' />
                <h1>Contraseña</h1>
                <input placeholder='Contraseña' />
                <button onClick={handleSignInCall}>
                    Subir
                </button>
                <NavLink to="/chatRooms">
                    <button>Siguiente</button>
                </NavLink>
            </div>
        </>
    );
}

export default ProfileUpload;