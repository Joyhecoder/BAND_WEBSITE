const express= require('express')
const router= express.Router();

const fs = require('fs');
//import data from chat.json
const chatData = require('../data/chat.json');

router.use(express.json())
router.use(express.urlencoded({extended: true}))

//display form
router.get('/chat', (req,res) => {
    res.render('chat')
})

//get all of the messages from chat.json
router.get('/api', (req, res) => {
    res.json(chatData)
})

//submit a new message
router.post('/api', (req, res) => {
    //get data from the chat.ejs header
    let {name, message} = req.body 

    //push object data to beginning of array
    chatData.unshift(req.body)

    fs.writeFile('data/chat.json', JSON.stringify(chatData), 'utf8', err=>{
        if(err){
            res.status(404).send(err)
        }
    })

    //send back all of the messages with the new message attached
    res.json(chatData)
})



module.exports = router;