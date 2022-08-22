const express= require('express');
const router = express.Router();

//import data from data.json
const dataFile = require('../data/data.json');

let albumInfo = dataFile.albums
// console.log(albumInfo);

//put cover pic in an array
let artwork =[];
albumInfo.forEach(albumObj=>{
    artwork = artwork.concat(albumObj.artwork)
})
// console.log(artwork);


//getting albumname
let albumname = [];
albumInfo.forEach(albumObj=>{
    albumname.push(albumObj.albumname)
})
// console.log(albumname);


//getting shortname
let shortname=[];
albumInfo.forEach(albumObj=>{
    shortname.push(albumObj.shortname)
})



router.get('/albums', (req, res) => {
    res.render('albums', {
        artwork: artwork,
        albumname: albumname,
        shortname: shortname
    })
    
})


//local:3000/albums/shortname
//speakerID = shortname
router.get('/albums/:speakerID', (req, res)=>{
    let shortName = req.params.speakerID;
    console.log(req.params);

    let album = []; //this is to get all the info for the one album 
    let summary = [];
    let tracklist= [];
    let albumAM = [];
    let albumSM = [];
    let albumCover= [];
    // let shortname=[];
    albumInfo.forEach(albumObj =>{
        if(albumObj.shortname == shortName){
            album.push(albumObj)
            summary = albumObj.summary
            tracklist = tracklist.concat(albumObj.tracklist)
            albumAM.push(albumObj.albumAM)
            albumSM.push(albumObj.albumSM)
            albumCover.push(albumObj.artwork)
            // shortname.push(albumObj.shortname)
        }
       
    })

    res.render('albumdetail', {
        // artwork: artwork,
        // pageTitle: albumname,
        summary: summary,
        tracklist: tracklist,
        albumAM: albumAM,
        albumSM: albumSM,
        album: album,
        albumCover: albumCover,
        // shortname: shortname

        
    })
    console.log(shortname);
})



module.exports = router;