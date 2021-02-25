const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = app.listen(3000);
const io = socketIO(server);

// helper functions
const lib = require('./lib');

app.use(express.static("public"));

let player = {
  sockets: [],
  save(socket) {
    if (!this.sockets.includes(socket)) {
      this.sockets.push(socket);
    }
  },
  remove(socket) {
    let index = this.sockets.indexOf(socket);
    this.sockets.splice(index, 1);
  },
  showCurrentConnections() {
    console.log(`Current connections: ${this.sockets.map((s) => s.id)}`);
  },
};

io.sockets.on("connection", (socket) => {
  player.save(socket);
  player.showCurrentConnections();

  socket.on("backChannel", (data) => {
    // do something with the client's response
  });
  socket.on("disconnect", (data) => {
    player.remove(socket);
    player.showCurrentConnections();
  });
});

/**
 * structure of command
 * socket: {command, file}
 * player -> socket
 * command -> play, pause, stop
 * file - path
 */

setInterval(() => {
  // send commands with a beat
  if (player.sockets) {
    player.sockets.forEach((socket) => {
      socket.emit("frontChannel", { command: "command", file: "file" });
    });
  }
}, 3000);
