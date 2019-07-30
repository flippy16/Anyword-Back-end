const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const messages = require('./db/MessageModel');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req ,res) => {
    res.json({
        message : 'Message Board'
    });
});

app.get('/all-messages-from-server/:limitMsg', (req, res) =>{
    var msgLimit = parseInt(req.params.limitMsg);
    messages.getAllMessages(msgLimit).then( messages => {
        res.json(messages);
    });
});

app.get('/specific-words/:msgNumb', (req, res) =>{
    var msgIdx = parseInt(req.params.msgNumb);
    messages.getRandom(msgIdx).then((msg) => {
        res.json(msg);
    }).catch((err) =>{
        res.status(500);
        res.json(err);
    });
});

app.post('/all-messages-from-server', (req, res) =>{
    console.log(req.body);
    messages.insertMessage(req.body).then((msg) => {
        res.json(msg);
    }).catch((err) =>{
        res.status(500);
        res.json(err);
    });
});

app.post('/remove', (req, res) =>{
    messages.removeMessage(req.body).then((result) => {
        res.json(result);
    });
});

app.post('/drop', (req, res) =>{
    messages.dropMessage().then((result) => {
        res.json(result);
    });
});

app.get('/count', (req, res) =>{
    messages.countMessage().then((counted) => {
        res.json(counted);
    });
});

app.get('/api/v1/get-messages-from/:startNumb', (req, res) =>{
    var msgIdx = parseInt(req.params.startNumb);
    messages.getFiveMessages(msgIdx).then( messages => {
        res.json(messages);
    });
});

app.get('/api/v1/random-words', (req, res) =>{
    messages.countMessage().then((counted) => {
        var lengthMsg = Math.floor(Math.random() * (counted - 0) + 0);
        messages.getRandom(lengthMsg).then((msg) => {
            var newMsgData = {
                name: msg.username,
                words: msg.message,
                date: msg.date
            }
            res.json(newMsgData);
        }).catch((err) =>{
            res.status(500);
            res.json(err);
        });
    });
});

app.get('/api/v1/at-words/:msgNumb', (req, res) =>{
    var msgIdx = parseInt(req.params.msgNumb);
    messages.getRandom(msgIdx).then((msg) => {
        var newMsgData = {
            name: msg.username,
            words: msg.message,
            date: msg.date
        }
        res.json(newMsgData);
    }).catch((err) =>{
        res.status(500);
        res.json(err);
    });
});

app.get('/api/v1/last-words', (req, res) =>{
    var msgIdx = parseInt(req.params.msgNumb);
    messages.getRandom(0).then((msg) => {
        var newMsgData = {
            name: msg.username,
            words: msg.message,
            date: msg.date
        }
        res.json(newMsgData);
    }).catch((err) =>{
        res.status(500);
        res.json(err);
    });
});

app.get('/api/v1/latest-words', (req, res) =>{
    messages.countMessage().then((counted) => {
        messages.getRandom((counted-1)).then((msg) => {
            var newMsgData = {
                name: msg.username,
                words: msg.message,
                date: msg.date
            }
            res.json(newMsgData);
        }).catch((err) =>{
            res.status(500);
            res.json(err);
        });
    });
});

const port = process.env.PORT || 9090;
app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});