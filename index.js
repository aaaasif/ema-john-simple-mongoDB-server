const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlewere
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kz6u6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run() {
    try{
        await client.connect();
        const database = client.db('online_shop');
        const productCollection = database.collection('products');

        // GET PRODUCTS API
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally{
        // await client.clone();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Ema John Server IS Running');
});
app.listen(port, () => {
    console.log('Server running port', port);
})