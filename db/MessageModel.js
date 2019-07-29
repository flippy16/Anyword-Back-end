const Joi = require('joi');
const db = require('./connection');

//Validation Message
const schema = Joi.object().keys({
    username : Joi.string().alphanum().max(10).required(),
    message : Joi.string().max(250).required(),
    imgURL : Joi.number().integer(),
    date : Joi.string(),
    number: Joi.number()
});

const messages = db.get('messages');

function getAllMessages(){
    return messages.find();
};

function insertMessage(msg){
    if(!msg.username) message.username = "Anonymous";
    console.log( "Booom"+countMessage());
    msg.number = countMessage();
    const result = Joi.validate(msg, schema);
    if (result.error == null){
        return messages.insert(msg);
    }else{
        console.log(result.error);
        return Promise.reject(result.error);
    }
}

function removeMessage(idMsg) {
    console.log(idMsg);
    messages.remove(idMsg, function (err, msg) {
        if(err) console.log(err.message);
        console.log("Removed " + msg);
        return db.close();
    });
}

function countMessage() {
    messages.count({}, function (err, count) {
        console.log(count);
        return count;
      }).catch((err) =>{
        res.status(500);
        res.json(err);
        }
    );
}

module.exports = {
    getAllMessages,
    insertMessage,
    removeMessage
};