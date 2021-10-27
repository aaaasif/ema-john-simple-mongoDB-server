const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Ema John Server IS Running');
});
app.listen(port, () => {
    console.log('Server running port', port);
})