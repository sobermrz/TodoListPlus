var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/insert', function(req, res, next) {
//   var item = {
//     id: req.body.id,
//     name: req.body.name,
//     title: req.body.title,
//     completed: req.body.completed
//   };
//   mongo.connect(url, function(err, db){
//     assert.equal(null, err);
//     db.collection('user-data').insertOne(item, function(error, result){
//       assert.equal(null, error);
//       console.log("Item inserted");
//       db.close();
//     })
//   })
// });

module.exports = router;
