const express= require('express')
const router= express.Router()

//import data from data.json
const dataFile = require('../data/data.json'); 

router.get('/', (req, res) => {
    res.render('index', {
        //data goes here
    })
    
})

module.exports = router;