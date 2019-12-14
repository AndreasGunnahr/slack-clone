const socket = io('http://localhost:3000')
const messageContainer = document.getElementsByClassName('messages')[0]
const messageForm = document.getElementById('send')
const messageInput = document.getElementById('input')
//let username = document.getElementById('username').innerText;
var typing = document.getElementsByClassName("isTyping");


var today = new Date()
var time = today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes()



const name = "ydehed"

socket.emit('new-user', name)

socket.on('chat-message', data => {
    sendMessage(`${data.message}`);
})

socket.on('user-connected', name => {
    sendMessage( `${name} connected`)
})

socket.on('user-disconnected', name => {
    sendMessage(` ${name} disconnected`)
})

socket.on('typing', () => {
    sendMessage(` someone is typing..`)
    console.log("someone is really typing")
})

// Typing
socket.on('updateTyping', function(name, isTyping) {
    if (isTyping === true) {
        $('.user-is-typing').html(name + ' is typing...');
    } else {
        $('.user-is-typing').html('');
    }
});



function istyping(){
    const para = document.createElement('p')
    para.classList.add("isTyping")
    para.innerText = "someone is typing"
    console.log("someone is typing")
}

messageForm.addEventListener('keyup', e =>{
    if(messageInput.value.length >= 1){
        istyping()
        socket.emit('is typing')
    }
    
})



messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    //var messageString = ` ${message}`
    sendMessage(message)
    socket.emit('send', message)
    messageInput.value = ''
    messageContainer.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
})


//when reloading, save chat messages
window.addEventListener('load', e => {
    console.log("stored adjdjjdjdj")
    
})




function sendMessage(message) {
    if(messageInput.value.length >= 1){
        $.ajax({
            url: 'http://localhost:3000/chat/new',
            method: 'POST',
            data: 
            {   
                'channelID': "87387837837874",
                'name': name,
                'time': time,
                'message': message,
    
    
            }
        }).done(function(data){
            console.log(data);
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
        })
    }
    
}