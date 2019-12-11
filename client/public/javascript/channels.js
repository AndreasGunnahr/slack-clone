const channels = document.querySelectorAll('.channel');
const chatMessages = document.getElementById('messages');

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
