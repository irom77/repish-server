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

client.on('error', function (err) {
    console.log("Error " + err);
    client.end();
});
var isWin = /^win/.test(process.platform);
var isVagrant = /vagrant/.test(require("os").hostname());

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index');
    res.sendFile(path.join(app.get('views') + '/index.html'));
});

router.post('/api/repcertifcates/:id', function (req, res, next) {
    var command = '/var/scripts/repishReset ' + req.params.id;
    if (isWin || isVagrant) {
        setTimeout(function () {
            res.send(command + '\n');
        }, 1000);
    }
    else
        exec(command, config.user_host).on('error', function(e) {
            console.log('ERROR', e);
            res.send("SSH NO RESPONSE" + '\n');
        }).pipe(res);
});

router.post('/api/updategateways/:id', function (req, res, next) {
    var command = '/var/scripts/repishUpdateGateways ' + req.params.id;
    //console.log(isWin);
    if (isWin || isVagrant) {
        setTimeout(function () {
            res.send(command + '\n');
        }, 1000);
    }
    else
        exec(command, config.user_host).on('error', function(e) {
            console.log('ERROR', e);
            res.send("SSH NO RESPONSE" + '\n');
        }).pipe(res);
});

router.post('/api/addrobo/', function (req, res, next) {
    var command = '/var/scripts/repishAddROBO ' + req.body.host + ' ' + req.body.subnet.replace(/.$/,"");
    //console.log(command);
    //console.log(isWin);
    if (isWin || isVagrant) {
        setTimeout(function () {
            res.send(command + '\n');
        }, 1000);
    }
    else
        exec(command, config.user_host).on('error', function(e) {
            console.log('ERROR', e);
            res.send("SSH NO RESPONSE" + '\n');
        }).pipe(res);
});

router.post('/api/counter/:id', function (req, res, next) {
    //client.set('save',1);
    client.incr(req.params.id, function (err, reply) {
        res.send(reply);
    });

});
router.get('/api/counter/:id', function (req, res, next) {
    client.get(req.params.id, function (err, reply) {
        res.send(reply);
    });
});


module.exports = router;
