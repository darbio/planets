var express = require('express');
var router = express.Router();
import * as uuid from 'uuid';
import { NewComplaintEvent, NewComplaintEventParams } from '../../../../flares/new-complaint';

var complaints: any = [];

/* GET complaints */
router.get('/', function(req, res, next) {
  res.json(complaints);
});

/* GET complaint by id */
router.get('/:id', function(req, res, next) {
  let complaint = complaints.filter((complaint) => {
    return complaint.id == req.params["id"];
  });
  res.json(complaint[0]);
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

/* PUT complaint */
router.put('/:id', function(publisher, logger, req, res, next) {
  function extend(obj, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
  }

  // Retrieve from the database
  let index = this.complaints.indexOf(complaints.filter((complaint) => {
    return complaint.id == req.params["id"];
  })[0]);

  // Extend the existing object
  this.complaints[index] = extend(this.complaints[index], req.body);

  res.json(this.complaints[index]);
});

module.exports = router;
