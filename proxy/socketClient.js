const net = require("net");
const dgram = require("dgram");
const { encodeMessage, decodeMessage, decryptCesarMessage, encryptCesarResponse } = require("./codec");

const BALANCERS = [
  // { host: "10.7.29.169", tcpPort: 8080, udpPort: 5001 }, //emi
  { host: "10.7.11.159", tcpPort: 3000, udpPort: 3001 }, //pepe
  { host: "10.7.11.159", tcpPort: 3100, udpPort: 3001 }, //pepe
  { host: "127.0.0.1", tcpPort: 5000, udpPort: 5001 },
  // { host: "10.7.6.109", tcpPort: 3000, udpPort: 3000}
  // Agrega más si lo necesitas
];

sendTcpMessage = async function (message) {
  for (const balancer of BALANCERS) {
    try {
      const response = await trySendTcp(message, balancer.host, balancer.tcpPort);
      return response; 
    } catch (err) {
      console.warn(`TCP falló con ${balancer.host}:${balancer.tcpPort} - ${err.message}`);
      continue;
    }
  }
  // return "{response_code: 503, response_text: 'No load Balancers found'}"
  // throw new Error("Ningún balanceador TCP está disponible.");
}

function trySendTcp(message, host, port) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.setTimeout(10000); 

    client.connect(port, host, () => {
      client.write(message);
    });

    client.on("data", (data) => {
      resolve(data.toString());
      client.destroy(); 
    });

    client.on("error", (err) => {
      client.destroy();
      reject(err);
    });

    client.on("timeout", () => {
      client.destroy();
      reject(new Error("Timeout"));
    });
  });
}

sendUdpMessage = async function(message) {
  for (const balancer of BALANCERS) {
    try {
      const response = await trySendUdp(message, balancer.host, balancer.udpPort);
      return response;
    } catch (err) {
      console.warn(`UDP falló con ${balancer.host}:${balancer.udpPort} - ${err.message}`);
      continue;
    }
  }
  throw new Error("Ningún balanceador UDP está disponible.");
}

function trySendUdp(message, host, port) {
  return new Promise((resolve, reject) => {
    const client = dgram.createSocket("udp4");
    const msgBuffer = Buffer.from(message);
    let responded = false;

    client.send(msgBuffer, 0, msgBuffer.length, port, host, (err) => {
      if (err) return reject(err);
    });

    client.on("message", (msg) => {
      responded = true;
      resolve(msg.toString());
      client.close();
    });

    client.on("error", (err) => {
      client.close();
      reject(err);
    });

    setTimeout(() => {
      if (!responded) {
        client.close();
        reject(new Error("Timeout UDP"));
      }
    }, 3000);
  });
}

exports.sendMsg = async function(params, action){
  for (const key in params) {
      const val = params[key];

      if (typeof val === 'string') {
        const trimmed = val.trim();

        // booleanos
        if (trimmed.toLowerCase() === 'true') {
          params[key] = true;
        } else if (trimmed.toLowerCase() === 'false') {
          params[key] = false;
        }
        // enteros
        else if (/^-?\d+$/.test(trimmed)) {
          params[key] = parseInt(trimmed, 10);
        }
        // posibles arreglos u objetos JSON
        else if ((trimmed.startsWith('[') && trimmed.endsWith(']')) ||
                 (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
          try {
            params[key] = JSON.parse(trimmed);
          } catch (e) {
            // si no se puede parsear, dejar como string
          }
        }
      }
    }
  if (action != 99){
    params.action = action

    console.log("%cparams", "color: green;", params)
    const message = JSON.stringify(params)
    console.log("%cmessage", "color: green;", message)
    const code = encryptCesarResponse(message)
    console.log("%ccode", "color: red;", code)
    const result = await sendTcpMessage(code)
     console.log("%cres", "color: blue;", result)
    if (!result) return null
    try{
      return JSON.parse(result)
    } catch{
    }
    const decode = decryptCesarMessage(result)
    console.log("%cdecode", "color: yellow;", decode)
    return JSON.parse(decode)
  }
  return null

}