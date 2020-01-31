const mongoose = require('mongoose');
const config = require('./config.json');
var uri = 'mongodb+srv://' + config.db.username + ':' + config.db.pw + '@secretkeeper-ytgv2.mongodb.net/secretKeeper';


class Database {
  constructor() {
  this._connect()
}

_connect() {
  mongoose.connect(uri)
    .then(() => {
      console.log('Database connection successful')
    })
    .catch(err => {
      console.error('Database connection error')
    })
  }
}
module.exports = new Database()