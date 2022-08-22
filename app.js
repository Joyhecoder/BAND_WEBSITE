//install express
const port=3000;
const express = require('express');
const app = express()

//install socket.io
const socket= require('socket.io');

// configure public folder
app.use(express.static('public'))

//install ejs templates 
app.set('view engine', 'ejs')


//set up a rountes folder and connect the routes in this app web
app.use(require('./routes/index'))
app.use(require('./routes/albums'))
app.use(require('./routes/feedback'))
app.use(require('./routes/chat'))

//start a server
let server= app.listen(port,(req,res)=>{
    console.log(`Listening on port: ${port}`);
})

let io = socket(server);

//listen for client messages
io.on('connection', socket =>{

    // socket.emit('updateMessage', 'welcome to blink')
    
    socket.on('postMessage', msgClient=>{   //listening for incoming chat messages

        io.emit('updateMessage', msgClient)  //broadcasts back out to all of the clients

    })
    console.log('a client has connected');

    socket.on('disconnect', reason=>{
        console.log('a user has left the room');
        io.emit('updateMessage', 'a user has left the room')
    })
})