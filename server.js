const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(express.json());

//Route to fetch all quotes
app.get('/api/quotes', (req, res) => {
    res.json({ quotes });
})

//Route to fetch a random quote
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.json({ quote: randomQuote });
});

// Route for adding new quotes
app.post('/api/quotes', (req, res) => {
    const { quote, person } = req.body;
    if (quote && person) {
        const newQuote = { quote, person };
        quotes.push(newQuote);
        res.status(201).json({ quote: newQuote });
    } else {
        res.status(400).json({ error: 'Both queote and prson are required.' });
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});