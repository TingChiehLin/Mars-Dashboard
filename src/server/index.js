require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const cors = require("cors")

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

const API_KEY = process.env.API_KEY;
//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos

// Fetch Image from NASA
app.get('/roverimage/:rover', async (req, res) => {
    const { rover } = req.params;
    
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-header', 'Content-Type, Authorization');

    try {        
        let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`)
            .then(res => res.json())
            res.send(data);
    } catch (err) {
        console.log('error:', err);
    }
})
//
app.listen(port, () => console.log(`Listening on port ${port}!`))