const express = require("express");
const app = express();
const cors = require('cors');
const axios = require('axios'); // Import axios

const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,POST', // Allow only GET and POST requests
    allowedHeaders: 'Content-Type,Authorization' // Allow only specific headers
};

app.use(cors(corsOptions)); // Apply CORS options

// Disable caching middleware
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

const PORT = 3001;
const API_KEY = '90aac41013ea463eaa6183535241606';

app.get('/:city', function(req, res) {
    const city = req.params['city'];
    let date = new Date();
    const today = date.toISOString().split('T')[0];

    const URL = `http://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${city}&dt=${today}`;

    axios.get(URL)
        .then(response => {
            console.log(URL);
            res.json(response.data.astronomy);
        })
        .catch(error => {
            console.error('Axios error:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(PORT, function() {
    console.log('listening on port', PORT);
});
