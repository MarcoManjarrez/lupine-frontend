import React from "react";
import "../styles/confirmModal.scss";

const ConfirmModal = ({action, confirmOption, handleCreateModalClose, handleCreateModalSend}) =>{

    return(
        <div className="confirmModal">
            <div className="confirmModal__header">
                <h1>{action}</h1>
            </div>
            <div className="confirmModal__buttonsContainer">
                <button className="comfirmModal__buttonsContainer__cancelButton" onClick={handleCreateModalClose}>Cancelar</button>
                <button className="comfirmModal__buttonsContainer__acceptButton" onClick={handleCreateModalSend}>{confirmOption}</button>
            </div>
        </div>
    )

}

export default ConfirmModal;
