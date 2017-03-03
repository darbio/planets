import * as bunyan from 'bunyan';
import { Subscriber } from '../../shared/subscriber';

export class Mercury {
  logger: any;
  subscriber: Subscriber;

  constructor() {
    this.logger = bunyan.createLogger({
      name : 'Planet Mercury'
    });

    this.logger.info('Starting planet Mercury');
    this.logger.info('Planet mercury is subscribing to \'domain:v1:comet:received\'');

    this.subscriber = new Subscriber('domain:v1:comet:received');
  }

  start() {
    this.subscriber.start((data, channel) => {
      this.logger.info('Mercury received an event on ' + channel);
    });
  }
}
