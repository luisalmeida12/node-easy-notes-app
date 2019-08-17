const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of conte-tye - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type -- application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const config = require('./config/keys.config.js');

mongoose.Promise = global.Promise;

// Connecting to the database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log("Could not connect to the database. Exiting now...", err);
//     process.exit();
// });

mongoose.connect(config.mongodbUri, { useNewUrlParser: true })
.then(() => console.log('Database connected'))
.catch((err) => console.log('Error on database connection', err));
mongoose.set('useFindAndModify', false);


// define a simple route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Easynotes application. Take notes quickly."});
});


require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});

