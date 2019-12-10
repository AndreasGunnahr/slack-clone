const socket = io.connect('http://localhost:4000')
const messageContainer = document.getElementById('messages')
const messageForm = document.getElementById('send')
const messageInput = document.getElementById('input')
const getValue = document.getElementsByClassName("text")[0].innerText;
const nameVal = getValue.substring(14)


console.log(nameVal);


socket.emit('new-user', nameVal)



socket.on('chat-message', data => {
    appendMessage(nameVal + `: ${data.message}`)
})

socket.on('user-connected', nameVal => {
    appendMessage(nameVal + ` connected`)
})

socket.on('user-disconnected', nameVal => {
    appendMessage(nameVal + ` disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage( nameVal + ' 21:32' + '<br>' + ` ${message}`).innerHTML
    socket.emit('send', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerHTML =  message
    messageContainer.append(messageElement)
}
