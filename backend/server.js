const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
var db = require('./db/database');

const SecretModel = require('./db/secretModel');

const app = express();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
const router = express.Router();
app.use('/api', router);
app.use(cors())

//app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/' , function(req, res){
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

/*Creates a new record with the new secret*/
router.post('/secrets/:secret', function(req, res) {
    let secret = new SecretModel({secret: req.params.secret});
    secret.save()
      .then(doc => {
        console.log("CREATED: ", doc);
        res.json(doc);
      })
  
});

/* Finds a random record in the database*/
router.get('/secrets', function(req, res) {
    SecretModel
    .aggregate([{ $sample: { size: 1 } }])
        .then(doc => {
            console.log("GOT: ", doc);
            res.json(doc);
        })
  
});


// launch our backend into a port
app.listen(5000);
console.log(`LISTENING ON PORT`);


module.exports = app;