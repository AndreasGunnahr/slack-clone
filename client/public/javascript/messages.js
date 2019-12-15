const directMessages = document.querySelectorAll(".directMessage");
const directMessageContainer = document.querySelector(".directMessage__container");

directMessages.forEach(message => {
    message.addEventListener('click', (e) => {
        const targetUsername = e.target.innerText;
        const targetID = e.target.id

        $.ajax({
            url: 'http://localhost:3000/chat/new-directMessage',
            method: 'POST',
            data: {'username': targetUsername, 'id': targetID}
        }).done(function(data){
            let linkElement = document.createElement('a');
            linkElement.classList.add('createdDirectMessage');
            linkElement.setAttribute("id", targetID);
            linkElement.innerText = targetUsername;
            if(data.status){
                directMessageContainer.append(linkElement);
                directMessageError.innerText = "";
                exitBtn[2].click();
            }else{
                directMessageError.innerText = data.error;
            }
        });
    });
});


