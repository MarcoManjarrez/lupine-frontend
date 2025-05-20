const net = require("net");
const dgram = require("dgram");

const BALANCERS = [
  // { host: "14.0.10.2", tcpPort: 5000, udpPort: 5001 },
  // { host: "143.104.150.2", tcpPort: 5000, udpPort: 5001 },
  { host: "127.0.0.1", tcpPort: 5000, udpPort: 5001 },
  // Agrega más si lo necesitas
];

exports.sendTcpMessage = async function (message) {
  for (const balancer of BALANCERS) {
    try {
      const response = await trySendTcp(message, balancer.host, balancer.tcpPort);
      return response; // Retorna en cuanto uno responde bien
    } catch (err) {
      console.warn(`TCP falló con ${balancer.host}:${balancer.tcpPort} - ${err.message}`);
      continue;
    }
  }
  throw new Error("Ningún balanceador TCP está disponible.");
}

function trySendTcp(message, host, port) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.setTimeout(3000); // timeout de 3 segundos por si está caído

    client.connect(port, host, () => {
      client.write(message);
    });

    client.on("data", (data) => {
      resolve(data.toString());
      client.destroy(); // cerrar conexión
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

exports.sendUdpMessage = async function(message) {
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

    // Timeout por si no responde
    setTimeout(() => {
      if (!responded) {
        client.close();
        reject(new Error("Timeout UDP"));
      }
    }, 3000);
  });
}
