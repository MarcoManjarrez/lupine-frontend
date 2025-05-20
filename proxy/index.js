const express = require('express');
const Users = require('./users');

const listenPort = 3001
const app = express();


app.get("/login", Users.login)
app.get("/logout", Users.logout)


app.listen(listenPort, () => { console.log(`Listening on port ${listenPort}`) });