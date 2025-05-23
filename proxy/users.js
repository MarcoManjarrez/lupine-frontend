const IO = require("./IO");
const { sendTcpMessage, sendMsg } = require("./socketClient");


exports.login = async function (req, res) {  //validate user
  const data = sendMsg(req.query, 0)
  return IO.throwResult(res, {message: "Log in", data: data})
}

exports.createUser = async function (req, res) { //create user
  const data = sendMsg(req.query, 2)
  return IO.throwResult(res, {message: "Create User", data: data})
}

exports.logout = async function (req, res) {//log out
  const data = sendMsg(req.query, 99)
  return IO.throwResult(res, {message: "Log out", data: data})
}

exports.getuserInfo = async function (req, res) {//getuserInfo
  const data = sendMsg(req.query, 3)
  return IO.throwResult(res, {message: "Get User Info", data: data})
}

exports.getAllUsers = async function (req, res) {// al users with id and nicknames
  const data = sendMsg(req.query, 99)
  return IO.throwResult(res, {message: "Get All Users", data: data})
}