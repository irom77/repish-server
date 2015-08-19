var express = require('express');
var router = express.Router();
var repcertificates = require('../modules/repcertificates');

/* GET home page. */
router.get('/', function(req, res,next) {
  res.render('index');
});

router.get('/api/manage', function(req, res, next) {
  //res.render('test');
  //res.json({name: 'foo'});
  data = repcertificates('Irek_Test_2_1100');
  //data = 'TESTing';
  //console.log(repcertificates('Irek_Test_1100'));
  /*res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });*/
  res.send(data);
});

module.exports = router;
