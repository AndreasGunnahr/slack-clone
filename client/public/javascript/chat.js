// const socket = io.connect('http://localhost:3000')
const messageContainer = document.getElementById('messages')
const messageForm = document.getElementById('send')
const messageInput = document.getElementById('input')
//let username = document.getElementById('username').innerText;


// let name = "andreas";

// socket.on('chat-message', data => {
//     appendMessage(username `: ${data.message}`)
// })


// socket.on('news', function (data) {
//     const messageElement = document.createElement('li')
//     messageElement.innerText = data.hello;
//     messageContainer.append(messageElement)
// });


// socket.on('user-disconnected', name => {
//     appendMessage(`${name} disconnected`)
// })

// messageForm.addEventListener('submit', e => {
//     e.preventDefault()
//     const message = messageInput.value
//     appendMessage(`${name}: ${message}`)
//     socket.emit('send', message)
//     messageInput.value = ''
// })

function appendMessage(message) {
    const messageElement = document.createElement('li')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
