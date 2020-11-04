require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const {getAll, getOne, update, delete, create} = require('./products_controller');

const {SERVER_PORT, CONNECTION_STRING} = process.env;

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectionUnauthorized: false}
}).then(db => {
    app.set('db', db);
}).catch(err => console.log(err));

app.get('/api/products', getAll);
app.get('/api/products/:id', getOne);
app.put('/api/products/:id', update);
app.post('/api/products', create);
app.delete('/api/products/:id', delete);


app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
})