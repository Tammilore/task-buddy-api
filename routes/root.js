const express = require('express')
const router = express.Router()
const path = require('path')

// Below we defined the pages we want to serve  and where they are
// Then the function is imported into the server.js file and the (direct) route for the pages are defined 

router.get('^/$|/index(.html)?', (req, res) => { // respond or serve the below when a GET request is made to the page with route / or/index.html
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html')) // This is the second way    
})

router.get('/new-page(.html)?', (req, res) => { // respond or serve the below when a GET request is made to the page with route /new-page.html
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html')) // This is the second way
})

router.get('/old-page(.html)?', (req, res) => { 
    res.redirect(301, './new-page.html') 
})

module.exports = router