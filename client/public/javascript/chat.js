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

// socket.on('typing', () => {
//     sendMessage(` someone is typing..`)
//     console.log("someone is really typing")
// })



// function istyping(){
//     const para = document.createElement('p')
//     para.classList.add("isTyping")
//     para.innerText = "someone is typing"
//     //console.log("someone is typing")
// }

// messageForm.addEventListener('keyup', e =>{
//     istyping()
//     socket.emit('is typing')
// })

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    sendMessage(message)
    socket.emit('send', message)
    messageInput.value = ''
    messageContainer.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    console.log(name, time, message)
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




// exports.update = function(req, res) {
//     var id = parseInt(req.params.id);
//     var updatedCustomer = req.body; 
//     if(customers["customer" + id] != null){
//       // update data
//       customers["customer" + id] = updatedCustomer;
   
//       console.log("--->Update Successfully, customers: \n" + JSON.stringify(customers, null, 4))
      
//       // return
//       res.end("Update Successfully! \n" + JSON.stringify(updatedCustomer, null, 4));
//     }else{
//       res.end("Don't Exist Customer:\n:" + JSON.stringify(updatedCustomer, null, 4));
//     }
//   };
   
//   exports.delete = function(req, res) {
//     var deleteCustomer = customers["customer" + req.params.id];
//       delete customers["customer" + req.params.id];
//       console.log("--->After deletion, customer list:\n" + JSON.stringify(customers, null, 4) );
//       res.end( "Deleted customer: \n" + JSON.stringify(deleteCustomer, null, 4));
//   };