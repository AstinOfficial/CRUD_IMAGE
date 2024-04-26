// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');
const path = require('path');


const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/uploads', express.static(path.join('uploads'))); 


//cors policy bloked error vsrumbol ethu kodukanam
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})



app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/api/products', productRoutes);

mongoose
    .connect('your link')
    .then(() => {
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })

    .catch(err => {
        console.log(err);
    });
