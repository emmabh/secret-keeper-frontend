var mongoose = require("mongoose");

var secretSchema = mongoose.Schema({
    secret: String   
});

var Secret = mongoose.model('Secret', secretSchema);

module.exports = Secret;