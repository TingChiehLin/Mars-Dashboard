require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const cors = require("cors")

const app = express()
const port = 3000

const { Map } = require('immutable');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

const API_KEY = process.env.API_KEY;

app.post('./post', async (req,res) => {
    try {

    } catch (err) {
        console.log('error:', err);
    }
})

// Fetch Image from NASA
app.get('/image', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
        console.log(image);
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Listening on port ${port}!`))