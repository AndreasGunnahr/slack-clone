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
const username = document.getElementById('username').innerText;



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
    channel.addEventListener('click', () => {
        const channelID = channel.attributes[0].value;
        const channelName = channel.innerText;
        channels.forEach(channel => {
            channel.classList.remove('active');
        });

        channel.classList.add('active');
        joinChannel(channelName, channelID);
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
                console.log(channels)
                channels.addEventListener('click', () => {
                    joinChannel(channel.name,channel._id)
                })
            })
       });
    });
});

/* If the user clicks the join channel button */
function joinChannel(nameChannel,channelID){
    // history.pushState({}, null, 'http://localhost:3000/chat/' + channelID);
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
        headerName.innerText = "#" + nameChannel;
        data.map(message => {
            let pElement = document.createElement('p');
            let liElement = document.createElement('li');
            pElement.innerText = message.text;
            liElement.innerText = message.username;
            liElement.append(pElement);
            chatMessages.append(liElement)
        });
        exitBtn[0].click();
    });
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




// async function DisplayMessages(id){
//     const responseMessages = await fetch('http://localhost:5000/channels/messages/' + id )
//     const dataMessages = await responseMessages.json()
//     dataMessages.forEach(message => {
//         let H1 = document.createElement('H1');
//         let H2 = document.createElement('H2');
//         H1.innerText = message.username;
//         H2.innerText = message.text;
//         chatMessages.append(H1)
//         chatMessages.append(H2)
//     });
    
   
    
    

