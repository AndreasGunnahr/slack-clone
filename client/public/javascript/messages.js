const directMessages = document.querySelectorAll(".directMessage");

directMessages.forEach(message => {
    message.addEventListener('click', (e) => {
        const targetUsername = e.target.innerText;
        const targetID = e.target.id

        $.ajax({
            url: 'http://localhost:3000/chat/new-directMessage',
            method: 'POST',
            data: {'username': targetUsername, 'id': targetID}
        })
      
    });
});