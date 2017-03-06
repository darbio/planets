import { IDomainEvent } from '../shared/domain-event';

export interface NewComplaintEventParams {
  complaint_id: string
}

export class NewComplaintEvent implements IDomainEvent {
  static event_name: string = `esafety:sol:sun:new_complaint`;
  name: string = NewComplaintEvent.event_name;

  complaint_id: string;

  constructor(params: NewComplaintEventParams) {
    this.complaint_id = params.complaint_id;
  }
}
