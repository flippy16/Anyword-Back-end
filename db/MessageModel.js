const Joi = require('joi');
const db = require('./connection');

//Validation Message
const schema = Joi.object().keys({
    username : Joi.string().alphanum().max(10).required(),
    subject : Joi.string().required(),
    message : Joi.string().max(500).required(),
    imgURL : Joi.string().uri({
        scheme : [/https?/]
    })
});

const messages = db.get('messages');

function getAllMessages(){
    return messages.find();
};

function insertMessage(msg){
    if(!msg.username) message.username = "Anonymous";
    const result = Joi.validate(msg, schema);
    if (result.error == null){
        return messages.insert(msg);
    }else{
        return Promise.reject(result.error);
    }
}

module.exports = {
    getAllMessages,
    insertMessage
};