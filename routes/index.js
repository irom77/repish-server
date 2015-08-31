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
  data = "Under Development\n";
  res.send(data);
  //verify with 'cpca_client lscert -kind SIC -stat Pending | grep -A 2 RoboName'
});

router.post('/api/counter/:id', function(req, res, next) {
    //client.set('save',1);
    client.incr(req.params.id, function(err, reply) {
      res.send(reply);
    });

});
router.get('/api/counter/:id', function(req, res, next) {
  client.get(req.params.id, function(err, reply) {
    res.send(reply);
  });
});


module.exports = router;
