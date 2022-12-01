const express = require('express')
const bodyParser=require('body-parser')
const app = express();
const HttpError = require('./models/http-error')
const sroute = require('./routes/studentroute');
const uroute = require('./routes/userroute')

app.use('/api/students', sroute); 
app.use('/api/user', uroute);
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
})

app.use((error, req, res, next) => { //error handling middleware function
    if (res.headerSent) { //if a response has already been sent, don't send another response but forward the error to the next middleware
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured' });
})
app.listen(5000);