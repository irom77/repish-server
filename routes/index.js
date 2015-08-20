var express = require('express');
var router = express.Router();
var repcertificates = require('../modules/repcertificates');

/* GET home page. */
router.post('/', function(req, res,next) {
  res.render('index');
});

router.post('/api/manage', function(req, res, next) {
  //res.render('test');
  //res.json({name: 'foo'});
  data = repcertificates('Irek_Test_1100');//TESTED SUCCESS
  //data = 'TESTing';
  //console.log(repcertificates('Irek_Test_1100'));
  /*res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });*/
  res.send(data,req.RoboName);
  //verify with 'cpca_client lscert -kind SIC -stat Pending | grep -A 2 RoboName'
});

module.exports = router;
