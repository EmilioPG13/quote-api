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

// Route for updating an existing quote
app.put('/api/quotes/:id', (req, res) => {
    const { id } = req.params;
    const { quote, person } = req.body;

    // Find the index of th quote with the given id
    const index = quotes.findIndex(q => q.id == id);

    if (index !== -1) {
        // Update the quote at the found index
        quotes[index] = { id, quote, person };
        res.json({ quote: quotes[index] });
    } else if (index === -1) {
        res.status(404).json({ error: 'Quote not found.'});
    } else {
        res.status(400).json({ error: 'Both quote and person are required.' });
    }
})

// Route for deleting a quote
app.delete('/api/quotes/:id', (req, res) => {
    const { id } = req.params;
    const index = quotes.findIndex(q => q.id == id);

    if (index !== -1) {
        quotes.splice(index, 1);
        res.json({ message: 'Quote deleted successfully.' });
    } else {
        res.status(404).json({ error: 'Quote not found.' });
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});