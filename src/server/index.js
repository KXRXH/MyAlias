const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const onConnection = (socket) => {
  console.log('onConnection', socket);
  const {roomId} = socket.handshake.query;
  socket.roomId = roomId;
  socket.join(roomId);

  socket.on('disconnect', () => {
    // выводим сообщение
    console.log('onDisconnect', socket);
    // покидаем комнату
    socket.leave(roomId);
  });
};

io.on('connection', onConnection);
server.listen(5000, () => {
  console.log(`Server ready. Port: 5000`);
});
