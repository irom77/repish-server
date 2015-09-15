var express = require('express');
var router = express.Router();
//var repcertificates = require('../modules/repcertificates');
//var updategateways = require('../modules/updategateways');
var exec = require('ssh-exec');
var config = require('./../configure/config');
var redis = require("redis"),
    client = redis.createClient(); //port,host

client.on('error', function(err) {
    console.log("Error " + err);
    client.end();
});

/* GET home page. */
router.get('/', function(req, res,next) {
  res.render('index');
});

router.post('/api/repcertifcates', function(req, res, next) {
  //res.render('test');
  //res.json({name: 'foo'});
  // data = req.body.RoboName;
//data = repcertificates(req.body.RoboName);//TESTED SUCCESS 'Irek_Test_1100', API_Test_1100
  data = "Under Development\n";
  res.send(data);
  //verify with 'cpca_client lscert -kind SIC -stat Pending | grep -A 2 RoboName'
});

router.post('/api/updategateways', function(req, res, next) {
    var command = '/var/scripts/dev-UpdateGateways';
    var command = config.UpdateGateways + 'SD-REPVPN';
    //exec(command, config.user_host).pipe(res);
    res.send(command);
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
