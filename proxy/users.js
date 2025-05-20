const { sendTcpMessage } = require("./socketClient");


exports.login = async function (req, res) {

  // const params = req.query

  // result = await sendTcpMessage(params.id)
  
  return res.send("Buenas")

}
exports.logout = async function (req, res) {
  console.log("beuasn")
  return res.send("adios")
  
}