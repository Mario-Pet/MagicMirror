// File: server.js

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let callsTaken = 0;

app.get('/add-call', (req, res) => {
  callsTaken++;
  io.emit('ADD_CALL', callsTaken);
  res.send(`Calls taken: ${callsTaken}`);
});

http.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
