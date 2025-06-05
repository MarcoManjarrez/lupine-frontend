const CESAR_SHIFT = 3; // Ajusta este valor al que uses en C
// const CESAR_MAGIC_HEADER = "CESAR:";

// Función para desencriptar usando cifrado César
function cesarDecrypt(text) {
    if (!text) return;

    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);

        if (c >= 32 && c <= 126) {
            let shifted = c - CESAR_SHIFT;
            if (shifted < 32) {
                shifted += 95; // Rango de caracteres imprimibles
            }
            result += String.fromCharCode(shifted);
        } else {
            result += text[i]; // Caracter no modificable
        }
    }

    return result;
}

// Función para encriptar usando cifrado César
function cesarEncrypt(text) {
    if (!text) return;

    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);

        if (c >= 32 && c <= 126) {
            let shifted = c + CESAR_SHIFT;
            if (shifted > 126) {
                shifted -= 95;
            }
            result += String.fromCharCode(shifted);
        } else {
            result += text[i];
        }
    }

    return result;
}

// Verifica si un mensaje está cifrado con César

// Desencripta mensaje completo si tiene el header César
function decryptCesarMessage(encryptedMessage) {
    const decrypted = cesarDecrypt(encryptedMessage);
    // console.log("CESAR: Decrypted message from client");
    return decrypted;
}

// Encripta respuesta antes de enviarla al cliente
function encryptCesarResponse(response) {
    if (!response) return null;
    const encryptedPart = cesarEncrypt(response);
    const encryptedMessage = encryptedPart;
    // console.log("CESAR: Encrypted response to client");
    return encryptedMessage;
}

module.exports = {
  encryptCesarResponse,
  decryptCesarMessage
};