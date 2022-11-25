const express = require('express')
const bodyParser=require('body-parser')
const app = express();

const sroute = require('./routes/studentroute');

app.use('/api/students', sroute); 
app.use((error, req, res, next) => { //error handling middleware function
    if (res.headerSent) { //if a response has already been sent, don't send another response but forward the error to the next middleware
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured' });
})
app.listen(5000);