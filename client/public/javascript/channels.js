const socket = io.connect('http://localhost:3000')
const channels = document.querySelectorAll('.channel');
let chatMessages = document.getElementById('messages');
const createChannelInput = document.getElementsByClassName("createChannel__input")[0];
const channelsContainer = document.getElementsByClassName("channels__container")[0];
const tBodyChannel = document.getElementById('tbody_channels');
const headerName = document.getElementById('header__name');
const nrOfMembers = document.getElementById('nrOfMembers');
const nrOfMembersH1 = document.getElementById('nrOfMembersH1');
const innerContainer = document.getElementsByClassName('inner__container')[0];
let username = document.getElementById('username').innerText;
const directMessages = document.querySelectorAll(".directMessage");
const directMessageContainer = document.querySelector(".directMessage__container");
let createdDirectMessage = document.querySelectorAll('.createdDirectMessage');
const messageContainer = document.getElementById('messages')
let channelIDButton; 
let editMsgID;

createdDirectMessage.forEach(directMessage => {
    directMessage.addEventListener('click', (e) => {
        addRemoveActive(e, e.target.innerText ,e.target.attributes[0].value, 'directMessage' );
    });
})

function addRemoveActive(e,username,id,checkValue ){
    let createdDirectMessage = document.querySelectorAll('.createdDirectMessage');
    createdDirectMessage.forEach(directMessage => { directMessage.classList.remove('active'); });
    channels.forEach(channel => { channel.classList.remove('active'); });
    e.target.classList.add('active');
    joinChannel(username, id, checkValue);
}

socket.on('change_message', (data) => {
    document.getElementsByName(data.editMsgID)[0].childNodes[2].innerText = data.newMessage;
    document.getElementById('changedValue').value = "";
});

socket.on('add_directMessage',(data) => {
    let name;
    if(username.toLowerCase() == data.targetUsername){
        name = data.username;
    }else{
        name = data.targetUsername;
    }
    let linkElement = document.createElement('a');
    linkElement.classList.add('createdDirectMessage');
    linkElement.setAttribute("name", data.targetID);
    linkElement.innerText = name;
    linkElement.addEventListener('click', (e) => {
        addRemoveActive(e, e.target.innerText ,e.target.attributes[0].value, 'directMessage' );
    })
    directMessageContainer.append(linkElement);
});

socket.on('send_message', (data) => {
    let HTML;
    let messageElement = document.createElement('DIV');
    messageElement.classList.add('text-container');
    if(username == data.username){
        HTML = `<div class = "icon-container">
            <a id = ${data.msgID} class="fas fa-pen editMessage"></a>
            <a id = "deleteMessage" class="fas fa-trash-alt"></a>
        </div>`
    }else{
        HTML = ``;
    }
    messageElement.innerHTML = 
    `<div class = "title">
    <p class = "chat-name">${data.username}
        <span class = "chat-time">${data.time}</span>
    </p>
    ${HTML}
    </div>
    <div class = "chat-message">
        ${data.text}
    </div>`;
    messageElement.setAttribute('name',data.msgID)
    messageContainer.append(messageElement)
    if(username.toLowerCase() == data.username.toLowerCase()){
        console.log("här")
        document.getElementById(data.msgID).addEventListener('click', (e) => {
            editMsgID = data.msgID;
            editMessageContainer.style.display = "block";
            overlay.style.display = "block";
        })
    }    
})

/* Checking against the DB if the room name is available for the current user */ 
createChannelInput.addEventListener('input', (e) => {
    const searchValue = e.target.value;
    $.ajax({
        url: 'http://localhost:3000/chat/check-new-channel',
        method: 'POST',
        data: {'searchChannel': searchValue}
    }).done(function (data) {
        if(!data.status){
            errorText.innerText = data.error;
            successText.style.display = "none";
            errorText.style.display = "block";
            createChannelBtn.disabled = true;
        }else{
            successText.innerText = data.success;
            successText.style.display = "block";
            errorText.style.display = "none";
            createChannelBtn.disabled = false;
        }
    })
});

channels.forEach(channel => {
    channel.addEventListener('click', (e) => {
        addRemoveActive(e, e.target.innerText, e.target.attributes[0].value, 'channels' );
    })
});

/* If the user clicks the "join channel", then we get the available channels.*/ 
joinChannelBtn.addEventListener('click', () => {
    channels.forEach(channel => {
        channel.classList.remove('active');
    });
    $.ajax({
        url: 'http://localhost:3000/chat/all-channels',
        method: 'GET',
    }).done(function (data) {
        tBodyChannel.innerHTML = "";
       data.map(channel => {
            let trTag = document.createElement('tr');
            trTag.classList.add('table-row-all-channels');
            trTag.innerHTML = '<td><a class = "channels">' + channel.name + '</a><input name =' + channel._id + ' type = "button" value = "Join"></td>';
            tBodyChannel.append(trTag);
            let allChannelsData = document.getElementsByName(channel._id);
            allChannelsData.forEach(channels => {
                channels.addEventListener('click', () => {
                    joinChannel(channel.name,channel._id, 'channels')
                })
            })
       });
    });
});

/* If the user clicks the join channel or sidebar channel */
function joinChannel(nameChannel,channelID, checkChoice){
    channelIDButton = channelID;
    chatMessages.innerHTML = "";
    socket.emit('reset_users_channel', {socketID: socket.id, username: username})
    socket.emit('join_channel', {channelID: channelID, socketID: socket.id, username: username});
    socket.on('numberOfUsers', (users) => {
        nrOfMembers.innerHTML = '<i class="far fa-user"></i>' + users.numberOfUsers;
        nrOfMembersH1.innerHTML = '<i class="far fa-user"></i>' + users.numberOfUsers + ' - Members online';
        innerContainer.innerHTML = "";
        users.memberList.map(member => {
            let h1Tag = document.createElement('H1');
            h1Tag.innerText = member;
            innerContainer.append(h1Tag);
        });
    });
    $.ajax({
        url:'http://localhost:3000/chat/messages/' + channelID ,
        method: 'GET'
    }).done(function(data){
        if(checkChoice == 'channels'){
            headerName.innerText = "#" + nameChannel;
            data.map(message => {
                reCreateMsg(message);
            });
        }
        else{
            headerName.innerText = nameChannel;
            data.map(message => {
                reCreateMsg(message);
            });
        }
        exitBtn[0].click();
    });
} 

function reCreateMsg(message){
    let HTML;
    let messageElement = document.createElement('DIV');
    messageElement.classList.add('text-container');
    if(username.toLowerCase() == message.username){
        HTML = `<div class = "icon-container">
            <a id = ${message._id} class="fas fa-pen editMessage"></a>
            <a id = "deleteMessage" class="fas fa-trash-alt"></a>
        </div>`
    }else{
        HTML = ``;
    }
    messageElement.innerHTML = 
    `<div class = "title">
    <p class = "chat-name">${message.username}
        <span class = "chat-time">${message.time}</span>
    </p>
    ${HTML}
    </div>
    <div class = "chat-message">
        ${message.text}
    </div>`;
    messageElement.setAttribute('name',message._id)
    messageContainer.append(messageElement)
    if(username.toLowerCase() == message.username){
        document.getElementById(message._id).addEventListener('click', (e) => {
            editMsgID = message._id;
            editMessageContainer.style.display = "block";
            overlay.style.display = "block";
        })
    }
}
/* If the user clicks the "create" new channel btn, we sending the information to the client server */
createChannelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementsByClassName('createChannel__input')[0].value;
    let description = document.getElementsByClassName('createChannel__input')[1].value;
    $.ajax({
        url:'http://localhost:3000/chat/new-channel',
        method: 'POST',
        data: {
            name: name,
            description: description
        }
    }).done(function(data){
        if(data.status){
            let linkTag = document.createElement('a');
            linkTag.innerHTML = '<i class = "fas fa-hashtag"></i>' + name;
            linkTag.classList.add('channel');
            linkTag.setAttribute('name', data.id);
            channelsContainer.append(linkTag);
            exitBtn[1].click();
        }
    });
})

    
   
    
    

