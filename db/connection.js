const monk = require('monk');
const conString = process.env.MONGODB_URI || 'localhost/msgboard';
const db = monk(conString);

module.exports = db; 
