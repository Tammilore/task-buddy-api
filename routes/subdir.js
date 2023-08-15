const express = require('express')
const router = express.Router() // This is a common module
const path = require('path')

// Below we defined the pages we want to serve  and where they are
// Then the function is imported into the server.js file and the (direct) route for the pages are defined 

router.get('^/$|/index(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views','subdir', 'index.html'))   
})

router.get('/test(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views','subdir', 'test.html'))   
})

module.exports = router