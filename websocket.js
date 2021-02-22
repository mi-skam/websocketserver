const WebSocket = require('ws');
const server = new WebSocket.Server({port: 8087});

let sockets = [];
server.on('connection', socket => {
  sockets.push(socket);

  socket.on('message', msg => {
    sockets.forEach(s => s.send(msg));
  })

  socket.on('close', () => {
    sockets = sockets.filter(s => s !== socket);
  });
});
