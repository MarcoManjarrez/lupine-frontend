const ENCRYPTION_KEY = 'buenas'; 


function xorEncryptDecrypt(input, key = ENCRYPTION_KEY) {
  let output = '';
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    output += String.fromCharCode(charCode);
  }
  return output;
}


function encodeMessage(obj) {
  const json = JSON.stringify(obj);
  const encrypted = xorEncryptDecrypt(json);
  return Buffer.from(encrypted, 'utf8').toString('base64'); 
}


function decodeMessage(encryptedBase64) {
  const encrypted = Buffer.from(encryptedBase64, 'base64').toString('utf8');
  const decryptedJson = xorEncryptDecrypt(encrypted);
  return JSON.parse(decryptedJson);
}

module.exports = {
  encodeMessage,
  decodeMessage,
};