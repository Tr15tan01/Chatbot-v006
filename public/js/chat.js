const form = document.querySelector('form');
const input = document.querySelector('.input');
const messages = document.getElementById('messages');
const username = prompt('Please enter a nickname: ', '');
const d = new Date();
const now = d.toLocaleTimeString();
const socket = io();
const classes = [
	'userName1',
	'userName2',
	'userName3'
];
const rand = Math.floor(Math.random() * 2);

form.addEventListener(
	'submit',
	function(event) {
		event.preventDefault();

		addMessage(
			'<span class="userName1"> ' +
				username +
				'</span>' +
				'  ' +
				input.value +
				'   ' +
				'<span class="timeSent"> ' +
				now +
				'</span>'
		);
		socket.emit('chat_message', {
			message : input.value
		});

		input.value = '';
		return false;
	},
	false
);

socket.on('chat_message', function(data) {
	const fun = () => {
		addMessage(
			'<span class="userName2">' +
				'chatbot' +
				'</span>' +
				': ' +
				data.message +
				' - ' +
				'<span class="timeSent"> ' +
				now +
				'</span>'
		);
	};
	setTimeout(fun, 600);
});

addMessage(
	"<span class='joiner'>You have joined the chat as  </span> " +
		'<span class="userName3"> ' +
		username +
		'</span>' +
		'<span class="timeSent"> ' +
		now +
		'</span>'
);
socket.emit('user_join', username);

function addMessage(message) {
	const li = document.createElement('li');
	li.innerHTML = message;
	messages.appendChild(li);
	// li.setAttribute("data-aos", "fade-left")
	window.scrollTo(0, document.body.scrollHeight);
}
