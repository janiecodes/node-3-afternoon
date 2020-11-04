require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const products_controller = require('./products_controller');

const {SERVER_PORT, CONNECTION_STRING} = process.env;

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db);
    console.log('Connected to database!')
}).catch(err => console.log(err));

app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.post('/api/products', products_controller.create);
app.delete('/api/products/:id', products_controller.delete);


app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
})