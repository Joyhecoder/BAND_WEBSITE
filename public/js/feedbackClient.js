let chatForm = document.querySelector('button')
chatForm.addEventListener('click', async (e)=>{
    //to prevent the page reload
    e.preventDefault();
    console.log(e);

    //make fetch call to store info into an obj
    let newMessage = {
        name: document.querySelector('#chat-form-name').value,
        message: document.querySelector('#chat-form-message').value
    }

    //make api call to add a new message
    let results= await fetch('/api', {
        method: "POST",
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(newMessage)
    })

    let message = await results.json();
    updateChat(message);


    //clear input field after clicking
    const inputs = document.querySelectorAll('.form-control, .form-label');
    inputs.forEach(input =>{
        input.value = '';
    })

})


const displayMessages = async () => {
    let result = await fetch('/api');
    let messages = await result.json();

    updateChat(messages)
    
}



const updateChat = (messagesArr) => {
    let htmlBlock = "";
    messagesArr.forEach((item, index)=>{

        htmlBlock += '     <div class="feedback-item item-list media-list">';
        htmlBlock += '       <div class="feedback-item media">';
        // htmlBlock += '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + index + '" class="glyphicon glyphicon-remove"></span></button></div>';
        htmlBlock += '         <div class="feedback-info media-body">';
        htmlBlock += '           <div class="feedback-head">';
        htmlBlock += '             <div class="feedback-title" style="font-size:50px"> <small class="feedback-name label label-info"><strong>' + item.name + '</strong></small></div>';
        htmlBlock += '           </div>';
        htmlBlock += '           <div class="feedback-message">' + item.message + '</div>';
        htmlBlock += '         </div>'; 
        htmlBlock += '       </div>';
        htmlBlock += '     </div>';
    })

    //attach to a dom element
    let chatMessages = document.querySelector('.feedback-messages');
    chatMessages.innerHTML = htmlBlock;
    
}

displayMessages()