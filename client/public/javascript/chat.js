const socket = io('http://localhost:3000')
const messageContainer = document.getElementsByClassName('messages')[0]
const messageForm = document.getElementById('send')
const messageInput = document.getElementById('input')
//let username = document.getElementById('username').innerText;

<<<<<<< HEAD

var today = new Date()
var time = today.getHours() + ":" + today.getMinutes()



const name = "ydehed"

socket.emit('new-user', name)

=======
>>>>>>> 10ada12b78a6a857a4849f2fa4e5ceeeca21c179
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage( `${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(` ${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    // var messageString = ` ${message}`
    appendMessage(message)
    socket.emit('send', message)
    messageInput.value = ''
})

function appendMessage(message) {
    
    const messageDiv = document.createElement('div')
    
    const titleDiv = document.createElement('div')
    const nameElement = document.createElement('p')
    const timeElement = document.createElement('span')

    const messageElement = document.createElement('div')
    const messageText = document.createElement('p')
    

    //text container 3
    messageDiv.classList.add("text-container")

    //title 2
    titleDiv.classList.add("title")
    //i title 1
    nameElement.classList.add("chat-name")
    timeElement.classList.add("chat-time")

    //message 2
    messageElement.classList.add("chat-message")
    

    messageText.innerText = message
    timeElement.innerText = time
    nameElement.innerText = name

    nameElement.append(timeElement)

    titleDiv.append(nameElement)
    messageDiv.append(titleDiv)

    messageElement.append(messageText)
    messageDiv.append(messageElement)

    messageContainer.append(messageDiv)
}