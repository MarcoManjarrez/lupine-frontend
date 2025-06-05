const IO = require("./IO");
const { sendMsg } = require("./socketClient");

exports.insertCharGroup = async function (req, res) {  //create chat 
  const data = await sendMsg(req.query, 4)
  return IO.throwResult(res, {message: "Create Chat", data: data})
}

exports.addUsersToChar = async function (req, res) { // Add user to chat
  const data = await sendMsg(req.query, 5)
  return IO.throwResult(res, {message: "Add to Group Chat", data: data})
}

exports.insertMessage = async function (req, res) { //send message
  const data = await sendMsg(req.query, 6)
  return IO.throwResult(res, {message: "Send Message", data: data})
}

exports.getChats = async function (req, res) { //get all user chats
  const data = await sendMsg(req.query, 7)
  return IO.throwResult(res, {message: "Get Chats", data: data})
}

exports.getChatMessages = async function (req, res) { // get messages from chat
  const data = await sendMsg(req.query, 8)
  return IO.throwResult(res, {message: "Get Chat Messages", data: data})
}

exports.getChatInfo = async function (req, res) { // get messages from chat
  const data = await sendMsg(req.query, 9)
  return IO.throwResult(res, {message: "Get Chat Info", data: data})
}

exports.deleteUsersFromChat = async function (req, res) { //delete user from chat
  const data = await sendMsg(req.query, 10)
  return IO.throwResult(res, {message: "Delete User from Chat", data: data})
}

exports.deleteChat = async function (req, res) { // delete chat 
  const data = await sendMsg(req.query, 11)
  return IO.throwResult(res, {message: "Exit Chat", data: data})
}