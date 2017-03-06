import * as bunyan from 'bunyan';
import * as request from 'request';
import { Subscriber } from '../../shared/subscriber';
import { NewComplaintEvent } from '../../flares/new-complaint';

export class Venus {
  logger: bunyan = bunyan.createLogger({ name : 'Planet Venus' });
  subscriber: Subscriber;

  constructor() {
    this.logger.info(`Subscribing to '${NewComplaintEvent.event_name}'`);
    this.subscriber = new Subscriber(NewComplaintEvent.event_name);
  }

  start() {
    this.subscriber.start((data, channel) => {
      // Type our event
      var event: NewComplaintEvent = data;

      this.logger.info(`Received an event on ${channel} for complaint ${event.complaint_id}`);

      // Get our complaint
      request.get(`${process.env.SUN_URI}/api/v1/complaints/${event.complaint_id}`, (err, httpResponse, body) => {
        if (err) {
          this.logger.error(err);
        }

        let complaint = JSON.parse(body);
        this.logger.info(complaint);

        if (complaint.type == "animal_complaint") {
          this.animals(complaint);
        }
      });
    });
  }

  animals(complaint: any): void {
    for (let locator of complaint.data.locators) {
      this.logger.info(`Running trace on ${locator}`);
    }
  }
}
