var express = require('express');
var router = express.Router();

var comets: any = [];

/* GET comets */
router.get('/', function(req, res, next) {
  res.json(comets);
});

/* POST comet */
router.post('/', function(publisher, logger, req, res, next) {
  // Do something with the input
  comets.push(req.body);

  // Put an event on our event queue
  logger.info('Publishing event', req.body)
  publisher.publish({
    name : 'domain:v1:comet:received',
    comet : req.body
  });

  res.json({ success : true });
});

module.exports = router;
