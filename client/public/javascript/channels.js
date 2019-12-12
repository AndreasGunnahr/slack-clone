const channels = document.querySelectorAll('.channel');
const chatMessages = document.getElementById('messages');
const createChannelInput = document.getElementsByClassName("createChannel__input")[0];
const createChannelBtn = document.getElementById('createChannelBtn');


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
            successText.innerText = "";
            createChannelBtn.disabled = true;
        }else{
            successText.innerText = data.success;
            errorText.innerText = "";
            createChannelBtn.disabled = false;
        }
    })
});

channels.forEach(channel => {
    channel.addEventListener('click', (e) => {
        let id = channel.attributes[0].value;
        channels.forEach(channel => {
            channel.classList.remove('active');
        });

        channel.classList.add('active');
        chatMessages.innerHTML = '';
        history.pushState(null, '', '/chat/' + id); 
        DisplayMessages(id);
    })
});


async function DisplayMessages(id){
    const responseMessages = await fetch('http://localhost:5000/channels/messages/' + id )
    const dataMessages = await responseMessages.json()
    dataMessages.forEach(message => {
        let H1 = document.createElement('H1');
        let H2 = document.createElement('H2');
        H1.innerText = message.username;
        H2.innerText = message.text;
        chatMessages.append(H1)
        chatMessages.append(H2)
    });
    
   
    
    
}
