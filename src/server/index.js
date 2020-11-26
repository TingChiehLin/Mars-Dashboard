require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const cors = require("cors")

const app = express()
const port = 3000

const { Map } = require('immutable');
const { nextTick } = require('process')

const rovers = Map({
    
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

const API_KEY = process.env.API_KEY;

app.post('./info', async (req,res) => {
    try {
        res.send();
    } catch (err) {
        console.log('error:', err);
    }
})

// Fetch Image from NASA
app.get('/roverimage', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-header', 'Content-Type, Authorization');
    next();
//res.body.rover
    try {        
        let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
            .then(res => res.json())
            res.send(data.photos)
            console.log(res.body.rover);
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Listening on port ${port}!`))