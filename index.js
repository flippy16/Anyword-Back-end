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

app.get('/messages', (req, res) =>{
    messages.getAllMessages().then( messages => {
        res.json(messages);
    });
});

app.post('/messages', (req, res) =>{
    console.log(req.body);
    messages.insertMessage(req.body).then((msg) => {
        res.json(msg);
    }).catch((err) =>{
        res.status(500);
        res.json(err);
    });
});

const port = process.env.PORT || 9090;
app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});