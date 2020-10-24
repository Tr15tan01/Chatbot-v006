const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 3000;
const express = require('express');
const publicDirectory = path.join(__dirname, './public');
const datObject = require('./data.js')

app.use(express.static(publicDirectory));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// const datObject = {
// 	hi  : 'hello',
// 	bye : 'bye bye',
// 	'გამარჯობა': 'გაგიმარჯოს',
// 	'ნახვამდის': 'კარგად'
// };

io.on('connection', function(socket) {

	socket.on('chat_message', function(data) {
		data.username = this.username;
		
			function checkanswer(ans) {
				return ans == data.message;
			}
			const arr = Object.keys(datObject);
			answer = arr.find(checkanswer);
			data.message = datObject[answer] || 'მაგაზე არ ვიცი რა გიპასუხო';
			// console.log(datObject[answer]);
		
		socket.emit('chat_message', data);
	});

});

http.listen(port, function() {
	console.log('Listening on *:' + port);
});
