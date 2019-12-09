const socket = io('http://localhost:4000')
const messageContainer = document.getElementById('messages')
const messageForm = document.getElementById('send')
const messageInput = document.getElementById('input')
const send = document.getElementById("send-btn")


socket.emit('new-user', name)

console.log(name)

socket.on('chat-message', data => {
    appendMessage(` ${name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

send.addEventListener('submit', e => {
    e.preventDefault()
    
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
