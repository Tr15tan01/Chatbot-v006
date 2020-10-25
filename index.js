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

io.on('connection', function(socket) {

	socket.on('chat_message', function(data) {
		data.username = this.username;
		
			function checkanswer(ans) {
				// return ans == data.message;
				return data.message.includes(ans)
			}
			const arr = Object.keys(datObject);

			answer = arr.find(checkanswer);
			//console.log('arr', arr, 'answer', answer, 'data.message', data.message)
			if(data.message.includes(answer)) {
				console.log('yes')
			}
			data.message = datObject[answer] || 'მაგაზე არ ვიცი რა გიპასუხო';
			// console.log(datObject[answer]);
		
		socket.emit('chat_message', data);
	});

});

http.listen(port, function() {
	console.log('Listening on *:' + port);
});
