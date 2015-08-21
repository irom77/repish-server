var express = require('express');
var router = express.Router();
var repcertificates = require('../modules/repcertificates');

/* GET home page. */
router.get('/', function(req, res,next) {
  res.render('index');
});

router.post('/api/manage', function(req, res, next) {
  //res.render('test');
  //res.json({name: 'foo'});
  data = repcertificates(req.body.RoboName);//TESTED SUCCESS 'Irek_Test_1100'
  //data = 'TESTing';
  //console.log(repcertificates('Irek_Test_1100'));
  /*res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });*/
  res.send(data);
  //verify with 'cpca_client lscert -kind SIC -stat Pending | grep -A 2 RoboName'
});

module.exports = router;
