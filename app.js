//install express
const port=3000;
const express = require('express');
const app = express()

// configure public folder
app.use(express.static('public'))

//install ejs templates
app.set('view engine', 'ejs')


//set up a rountes folder and connect the routes in this app web
app.use(require('./routes/index'))
app.use(require('./routes/albums'))
app.use(require('./routes/chat'))

//start a server
app.listen(port,(req,res)=>{
    console.log(`Listening on port: ${port}`);
})