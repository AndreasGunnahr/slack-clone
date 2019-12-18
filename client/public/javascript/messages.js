const saveChangesBtn = document.getElementById('saveChanges');


msgInput.addEventListener('input', (e) => {
    socket.emit('someone_typing', {username: username, channelID: channelIDButton, enteredValue: e.target.value})
});


// socket.on('typing_message', (data) => {
//     let HTML;
//     let typingElement = document.createElement('DIV');
//     typingElement.classList.add('is-typing');
//     typingElement.innerHTML =
//     `<div class = "is_typing">
//     <p class = "name-typing">${data.username}
//         <span class = "message-typing">is typing...</span>
//     </p>
//     `
//     typingElement.setAttribute('name',data.username)
//     messageContainer.append(typingElement)
//     if(username.toLowerCase() == data.username.toLowerCase()){
//         document.getElementById(data.msgID).addEventListener('keyup', (e) => {
//             console.log("someone is typing")
//         })
//     }
//     console.log('error bror')
// })
// socket.on('is_typing', (data) => {
//     io.in(data.channelID).emit('typing_message', {username: data.username, editMsgID: data.editMsgID})
//   });

socket.emit('set_username', username);

saveChangesBtn.addEventListener('click', () => {
   let newText = document.getElementById('changedValue').value;
   $.ajax({
        url: 'http://localhost:3000/chat/message/edit/' + editMsgID,
        method: 'PUT',
        data: {text: newText}
   }).done(function(data){
       socket.emit('update_message', {message: newText, channelID: channelIDButton, editMsgID: editMsgID})
       cancelBtn.click();
   });
});


directMessages.forEach(message => {
    message.addEventListener('click', (e) => {
        let targetUsername = e.target.innerText;
        let targetID = e.target.id
        $.ajax({
            url: 'http://localhost:3000/chat/new-directMessage',
            method: 'POST',
            data: {'username': targetUsername, 'id': targetID}
        }).done(function(data){
            if(data.status){
                let channelID = data.id;
                directMessageError.innerText = "";
                exitBtn[2].click();
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
                socket.emit('create_directMessage', {socketID: socket.id, channelID: channelID, targetUsername: targetUsername, targetID: targetID, username: username});
            }else{
                directMessageError.innerText = data.error;
            }
        });
    });
});
