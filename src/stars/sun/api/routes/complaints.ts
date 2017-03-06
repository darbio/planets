var express = require('express');
var router = express.Router();
import * as uuid from 'uuid';
import { NewComplaintEvent, NewComplaintEventParams } from '../../../../flares/new-complaint';
import { ComplaintsService } from '../../../../shared/services/complaints-service';

/* GET complaints */
router.get('/', function(complaintsService: ComplaintsService, req, res, next) {
  res.json(complaintsService.getList());
});

/* GET complaint by id */
router.get('/:id', function(complaintsService: ComplaintsService, req, res, next) {
  let complaint = complaintsService.getById(req.params["id"]);
  res.json(complaint);
});

/* POST complaint */
router.post('/', function(complaintsService: ComplaintsService, req, res, next) {
  let id = complaintsService.create(req.body);
  res.json(id);
});

/* PUT complaint */
router.put('/:id', function(complaintsService: ComplaintsService, req, res, next) {
  let id = complaintsService.update(req.body);
  res.json(id);
});

module.exports = router;
