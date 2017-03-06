import * as bunyan from 'bunyan';
import { Subscriber } from '../../shared/subscriber';

export class Venus {
  logger: bunyan;
  subscriber: Subscriber;

  constructor() {
    this.logger.info(`Subscribing to 'domain:v1:comet:received'`);
    this.subscriber = new Subscriber('domain:v1:comet:received');
  }

  start() {
    this.subscriber.start((data, channel) => {
      this.logger.info('Received an event on ' + channel);
    });
  }
}
