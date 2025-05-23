import {useState} from "react";
import { NavLink } from "react-router-dom";
import LupineImage from "../img/lupineImage.png";
import { EditOutlined } from "@ant-design/icons";
import "../styles/profileUpload.scss";

const ProfileUpload = () =>{
    return(
        <>
          <div className="profileUploadContainer">
            <div className="profileUploadContainer__imageContainer">
                <img src={LupineImage} alt="Placeholder profile picture"/>
                <button className="profileUploadContainer__imageContainer__editButton">
                    <EditOutlined/>
                </button>
            </div>
            <h1>Correo</h1>
            <input placeholder='ejemplo@correo.com'/>
            <h1>Nombre de usuario</h1>
            <input placeholder='Nombre de usuario'/>
            <h1>Contraseña</h1>
            <input placeholder='Contraseña'/>
            <button>
                Subir
            </button>
            <NavLink to="/chatRooms">
            <button onClick={{}}>Siguiente</button>
            </NavLink>
          </div>
        </>
    );
}

export default ProfileUpload;