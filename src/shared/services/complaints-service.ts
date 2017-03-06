import { Complaint } from '../model/complaint';
import { Publisher } from '../publisher';
import { NewComplaintEvent, NewComplaintEventParams } from '../../flares/new-complaint';
import * as uuid from 'uuid';

export class ComplaintsService {
  complaints: Complaint[] = [];
  publisher: Publisher;

  constructor(publisher: Publisher) {
    this.publisher = publisher;
  }

  create(complaint: Complaint): string {
    // Persist to the database
    complaint.id = uuid.v4(); // Add a unique id
    this.complaints.push(complaint);

    // Put an event on our event queue
    let eventParams: NewComplaintEventParams = {
      complaint_id : complaint.id
    };
    this.publisher.publish(new NewComplaintEvent(eventParams));

    // Return the ID
    return complaint.id;
  }

  getList(): Complaint[] {
    return this.complaints;
  }

  getById(id: string): Complaint {
    let index = this.complaints.indexOf(this.complaints.filter((c) => {
      return c.id == id;
    })[0]);

    if (index >= 0) {
      return this.complaints[index];
    }
    else {
      return null;
    }
  }

  update(complaint: Complaint): string {
    function extend(obj, src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
      }
      return obj;
    }

    // Retrieve from the database
    let index = this.complaints.indexOf(this.complaints.filter((c) => {
      return c.id == complaint.id;
    })[0]);

    // Extend the existing object
    this.complaints[index] = extend(this.complaints[index], complaint);

    // Put an event on our event queue
    // TODO

    // Return the ID
    return complaint.id;
  }

  delete(id: string): void {

  }
}
