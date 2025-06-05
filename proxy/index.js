const express = require('express');
const cors = require('cors');


const Users = require('./users');
const Chats = require('./chats');


const listenPort = 3001


const app = express();
app.use(cors());


app.post("/login", Users.login) //0
app.post("/createUser", Users.createUser) //2
app.post("/logout", Users.logout)
app.get("/getuserInfo", Users.getuserInfo)//3


app.post("/createChat", Chats.insertCharGroup)  //4
app.post("/addToGroupChat", Chats.addUsersToChar) // 5
app.post("/sendMessage", Chats.insertMessage)  //6
app.get("/getChats", Chats.getChats) //7  
app.get("/getChatMessages", Chats.getChatMessages) //8
app.get("/getChatInfo", Chats.getChatInfo) //9
app.delete("/removeFromChat", Chats.deleteUsersFromChat) //10
app.delete("/exitChat", Chats.deleteChat) //11


app.listen(listenPort, '0.0.0.0',   () => { console.log(`Listening on port ${listenPort}`) });