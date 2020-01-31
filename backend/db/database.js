const mongoose = require('mongoose');
var uri = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PW + '@secretkeeper-ytgv2.mongodb.net/secretKeeper';


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