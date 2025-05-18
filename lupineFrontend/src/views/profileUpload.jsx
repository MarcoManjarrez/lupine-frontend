import {useState} from "react";
import LupineImage from "../img/lupineImage.png";
import { EditOutlined } from "@ant-design/icons";
import "../styles/profileUpload.scss";

const ProfileUpload = () =>{
    return(
        <>
          <div className="profileUploadContainer">
            <div className="profileUploadContainer__imageContainer">
                <img src={LupineImage} alt="Placeholder profile picture"/>
                <button>
                    <EditOutlined/>
                </button>
            </div>
            <h1>Nombre de usuario</h1>
            <input placeholder='Nombre de usuario'/>
            <h1>Contraseña</h1>
            <input placeholder='Contraseña'/>
            <button>
                Subir
            </button>
          </div>
        </>
    );
}

export default ProfileUpload;