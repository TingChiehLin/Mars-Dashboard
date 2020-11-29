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

// Fetch Image from NASA
app.get('/roverimage/:rover', async (req, res) => {
    const { rover } = req.params;
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-header', 'Content-Type, Authorization');

    try {        
        let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            res.send(data.photos);
            console.log(res.body.rover);
    } catch (err) {
        console.log('error:', err);
    }
})
//
//https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.toLowerCase()}/photos?sol=1000&api_key=${API_KEY}

app.listen(port, () => console.log(`Listening on port ${port}!`))