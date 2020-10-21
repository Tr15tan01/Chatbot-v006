const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 3000;
const express = require('express');
const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	socket.on('user_join', function(data) {
		this.username = data;
		socket.broadcast.emit('user_join', data);
		//console.log(socket.id)
		// console.log(socket.adapter.rooms[socket.id].length);
		//console.log(Object.keys(io.of('/').connected).length)
		//console.log(Object.keys(io.of('/').server))
	});

	socket.on('chat_message', function(data) {
		data.username = this.username;

		socket.broadcast.emit('chat_message', data);
	});

	socket.on('disconnect', function(data) {
		socket.broadcast.emit('user_leave', this.username);
	});
});

http.listen(port, function() {
	console.log('Listening on *:' + port);
});
