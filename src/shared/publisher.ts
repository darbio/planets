import * as NRP from 'node-redis-pubsub';

export class Publisher {
  nrp: any;

  constructor() {
    var config = {
      url: process.env.REDIS_URL
    };
    this.nrp = new NRP(config);
  }

  publish(event) {
    this.nrp.emit(event.name, event);
  }
}
