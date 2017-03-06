var express = require('express');
var router = express.Router();
import * as uuid from 'uuid';
import { NewComplaintEvent, NewComplaintEventParams } from '../../../../flares/new-complaint';

var complaints: any = [];

/* GET complaints */
router.get('/', function(req, res, next) {
  res.json(complaints);
});

/* POST complaint */
router.post('/', function(publisher, logger, req, res, next) {
  // Validate the input
  // TODO

  // Persist the complaint to the database
  let complaint = req.body;
  complaint.id = uuid.v4(); // Add a unique id
  complaints.push(complaint);

  // Put an event on our event queue
  let eventParams: NewComplaintEventParams = {
    complaint_id : complaint.id
  };
  publisher.publish(new NewComplaintEvent(eventParams));

  res.json({ success : true });
});

module.exports = router;
