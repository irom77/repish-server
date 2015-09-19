var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
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

router.post('/api/repcertifcates', function(req, res, next) {
  //res.render('test');
  //res.json({name: 'foo'});
  // data = req.body.RoboName;
//data = repcertificates(req.body.RoboName);//TESTED SUCCESS 'Irek_Test_1100', API_Test_1100
  data = "Under Development\n";
  res.send(data);
  //verify with 'cpca_client lscert -kind SIC -stat Pending | grep -A 2 RoboName'
});

router.post('/api/updategateways/:id', function(req, res, next) {
    var command = '/var/scripts/repishUpdateGateways ' + req.params.id;
    console.log('---> ', command);
    exec(command, config.user_host).pipe(res);
    //res.send(command + '\n' + config.user_host);
    //SD-REPVPN-02: 'Update CO' operation has finished successfully.
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
