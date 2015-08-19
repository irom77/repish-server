var express = require('express');
var router = express.Router()
var repcertificates = require('../modules/repcertificates');

/* GET home page. */
router.get('/', function(req, res,next) {
  res.render('index');
});

router.get('/api/manage', function(req, res,next) {
  //res.render('test');
  //res.json({name: 'foo'});
  //console.log(repcertificates('Irek_Test_1100'));
  data = repcertificates('Irek_Test_1100');
  response.writeHead(200, {
    'Content-Type': 'application/text',
    'Content-Length': data.length,
    'Access-Control-Allow-Origin': '*'
  });
  response.write(data);
  response.end();
});

module.exports = router;
