const IO = require("./IO");
const { sendTcpMessage } = require("./socketClient");

exports.insertCharGroup = async function (req, res) {  //create chat 
  const data = sendMsg(req.query, 4)
  return IO.throwResult(res, {message: "Create Chat", data: data})
}

exports.addUsersToChar = async function (req, res) { // Add user to chat
  const data = sendMsg(req.query, 5)
  return IO.throwResult(res, {message: "Add to Group Chat", data: data})
}

exports.insertMessage = async function (req, res) { //send message
  const data = sendMsg(req.query, 6)
  return IO.throwResult(res, {message: "Send Message", data: data})
}

exports.getChats = async function (req, res) { //get all user chats
  const data = sendMsg(req.query, 7)
  return IO.throwResult(res, {message: "Get Chats", data: data})
}

exports.getChatMessages = async function (req, res) { // get messages from chat
  const data = sendMsg(req.query, 8)
  return IO.throwResult(res, {message: "Get Chat Messages", data: data})
}

exports.deleteUsersFromChat = async function (req, res) { //delete user from chat
  const data = sendMsg(req.query, 99)
  return IO.throwResult(res, {message: "Delete User from Chat", data: data})
}

exports.deleteChat = async function (req, res) { // delete chat 
  const data = sendMsg(req.query, 99)
  return IO.throwResult(res, {message: "Delete Chat", data: data})
}