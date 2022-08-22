
let socket = io(); //access to web socket api

let chatUsername= document.getElementById('chat-username');
let chatMessage= document.getElementById('chat-message');
let chatForm = document.querySelector('form');
let chatDisplay= document.querySelector('.chat-display');
let chatButton = document.querySelector('#chat-submit');


//listen to incoming messages fromm the server
//{username:...., message:...}
socket.on('updateMessage', data =>{
    console.log(data);
    //create a p tag 
    let newMessage= document.createElement('p')
    //style the p tag
    if(chatUsername.value === data.username){
        newMessage.className= "bg-success chat-text"
    }
    else{
        newMessage.className= "bg-light text-warning chat-text"
    }

    //set the innerHTML for the p tag
    newMessage.innerHTML = `<strong>${data.username}</strong>: ${data.message}`
   

    //append to the top of all message in chatDisplay
    chatDisplay.insertBefore(newMessage, chatDisplay.firstChild) //appends to the beginning of all the messages

    //to clear the message bar once submit the message
    chatMessage.value= ""

 

})


//emit a message to the server
chatForm.addEventListener('submit', e=>{
    e.preventDefault();
    console.log(e);
    //send message to the server
    socket.emit('postMessage', {
        username: chatUsername.value,
        message:chatMessage.value,
        
    })
   
    
})





//on is an event listener it listen for the server event