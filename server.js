let plivo = require('plivo');
let keys = require("./keys");
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const socketio = require('socket.io');
require("dotenv").config();


// Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Catch form submit
app.post('/client', (req, res) => {
    'use strict';
    // res.send(req.body);
    console.log(req.body);
    let phoneNum = 1 + req.body.number;
    let messageSent = req.body.message;
        // As the auth_id and auth_token are unspecified, Plivo will fetch them from the PLIVO_AUTH_ID and PLIVO_AUTH_TOKEN environment variables.
    let client = new plivo.Client(keys.PLIVO_AUTH_ID, keys.PLIVO_AUTH_TOKEN);
    client.messages.create(
        "17037750874", // src
        phoneNum, // dst
        messageSent, // text
    ).then(function (response) {
        console.log(response);
        io.emit('smsText', {messageSent});
    }, function (err) {
        console.error(err);
});


    app.use(express.static(__dirname + '/public'));
    app.all('/receiveSms/', function(req, res) {
        // Sender's phone number
        var phoneNumRec = req.param('From');
         // Receiver's phone number - Plivo number
        // var messageRec = req.param('To');
        // The text which was received
        var messageRec = req.param('Text');

        console.log ( phoneNumRec + messageRec);

        io.emit('replyText', {phoneNumRec,messageRec});
    }, function (err) {
        console.error(err);
        
    });
});

// Define port
const port = 3000;

// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

// Connect to socket.io
const io = socketio(server);
    io.on('connection', (socket) => {
    console.log('Connected');

    io.on('disconnect', () => {
    console.log('Disconnected');
  
    });
});
