import * as NRP from 'node-redis-pubsub';
import { IDomainEvent } from './domain-event';

export class Publisher {
  nrp: any;

  constructor() {
    var config = {
      url: process.env.REDIS_URL
    };
    this.nrp = new NRP(config);
  }

  publish(event: IDomainEvent) {
    this.nrp.emit(event.name, event);
  }
}
