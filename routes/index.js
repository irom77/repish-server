var express = require('express');
var router = express.Router();
var repcertificates = require('../modules/repcertificates');
var redis = require("redis"),
    client = redis.createClient(); //port,host

/* GET home page. */
router.get('/', function(req, res,next) {
  res.render('index');
});

router.post('/api/cli', function(req, res, next) {
  //res.render('test');
  //res.json({name: 'foo'});
  // data = req.body.RoboName;
//data = repcertificates(req.body.RoboName);//TESTED SUCCESS 'Irek_Test_1100', API_Test_1100
  data = "Under Development";
  res.send(data);
  //verify with 'cpca_client lscert -kind SIC -stat Pending | grep -A 2 RoboName'
});

router.post('/api/counter', function(req, res, next) {
    client.set('save',1);
    client.incr('save', function(err, reply) {
      console.log(reply);
      res.send(reply);
    });

});
router.get('/api/counter', function(req, res, next) {
  client.get('save', function(err, reply) {
    console.log(reply);
    res.send(reply);
  });
});


module.exports = router;
