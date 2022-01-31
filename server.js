const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('config');

const api = require('./routes/api');

const app = express();

// Bodyparser Middlesware
app.use(express.json());
app.use( cookieParser() );

// DB Config
const db = config.get('mongoURI');

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
   .then( () => console.log('mongoDB Connected...') )
   .catch( err => console.log(err) );

// Use Routes
app.use('/api', api)

// Serve static assets if in production
if(process.env.NODE_ENV  === 'production') {
   app.use(express.static('/client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
   })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`) );
