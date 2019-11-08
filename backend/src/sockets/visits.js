module.exports = function(io){
  io.on('connection', (socket) => {
		socket.on('room', function(room) {
			console.log(room);
			socket.join(room);
		});

		socket.on('message', data => {
			console.log(data)
			io.to("room_" + data.userRoom).emit('message', data.userId);
		});
})};
