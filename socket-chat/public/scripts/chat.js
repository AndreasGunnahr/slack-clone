
const socket = io('http://localhost:4000')
const messageContainer = document.getElementById('messages')
const messageForm = document.getElementById('send')
const messageInput = document.getElementById('input')


socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`You: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`${name}: ${message}`)
    socket.emit('send', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
