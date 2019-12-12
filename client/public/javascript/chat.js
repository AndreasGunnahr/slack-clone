const socket = io('http://localhost:3000')
const messageContainer = document.getElementsByClassName('messages')[0]
const messageForm = document.getElementById('send')
const messageInput = document.getElementById('input')
//let username = document.getElementById('username').innerText;


var today = new Date()
var time = today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes()



const name = "ydehed"

socket.emit('new-user', name)

socket.on('chat-message', data => {
    sendMessage(`${data.message}`)
})

socket.on('user-connected', name => {
    sendMessage( `${name} connected`)
})

socket.on('user-disconnected', name => {
    sendMessage(` ${name} disconnected`)
})

//is typing.. 

// var typing = false;
// var timeout = undefined;

// function timeoutFunction(){
//   typing = false;
//   socket.emit('is typing', name);
// }

// function onKeyDownNotEnter(){
//   if(typing == false) {
//     typing = true
//     socket.emit('is typing', name);
//     timeout = setTimeout(timeoutFunction, 5000);
//   } else {
//     clearTimeout(timeout);
//     timeout = setTimeout(timeoutFunction, 5000);
//   }

// }

// messageForm.addEventListener('keyup', e =>{
//     e.preventDefault()
//     timeoutFunction()
//     onKeyDownNotEnter()
//     console.log(timeoutFunction)
// })

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    // var messageString = ` ${message}`
    sendMessage(message)
    socket.emit('send', message)
    messageInput.value = ''
    messageContainer.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
})



function sendMessage(message) {
    
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