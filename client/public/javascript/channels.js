const socket = io.connect('http://localhost:3000')
const channels = document.querySelectorAll('.channel');
const chatMessages = document.getElementById('messages');
const createChannelInput = document.getElementsByClassName("createChannel__input")[0];
const channelsContainer = document.getElementsByClassName("channels__container")[0];
const tBody = document.getElementsByTagName('tbody')[0];


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


/* If the user clicks the "join channel", then we get the available channels.*/ 
joinChannelBtn.addEventListener('click', () => {
    $.ajax({
        url: 'http://localhost:3000/chat/all-channels',
        method: 'GET',
    }).done(function (data) {
       tBody.innerHTML = "";
       data.map(channel => {
            let trTag = document.createElement('tr');
            trTag.classList.add('table-row-all-channels');
            trTag.innerHTML = '<td><a class = "channels">' + channel.name + '</a><input id =' + channel._id + ' type = "button" value = "Join"></td>';
            tBody.append(trTag);
            document.getElementById(channel._id).addEventListener('click', () => {
                socket.emit('join', {channelID: channel._id});
                socket.on('message', function(data){
                    console.log(data)
                })
            })
       });
    });
});

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
            linkTag.setAttribute("id", data.id);
            channelsContainer.append(linkTag);
            exitBtn[1].click();
        }
    });
})


// channels.forEach(channel => {
//     channel.addEventListener('click', (e) => {
//         let id = channel.attributes[0].value;
//         channels.forEach(channel => {
//             channel.classList.remove('active');
//         });

//         channel.classList.add('active');
//         chatMessages.innerHTML = '';
//         history.pushState(null, '', '/chat/' + id); 
//         DisplayMessages(id);
//     })
// });


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
    
   
    
    

