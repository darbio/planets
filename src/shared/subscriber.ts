import * as NRP from 'node-redis-pubsub';

export class Subscriber {
  nrp: any;
  channel: string;

  constructor(channel: string) {
    var config = {
        url: process.env.REDIS_URL
    };
    this.nrp = new NRP(config);

    this.channel = channel;
  }

  start(callback: (data: any, channel: string) => void): void {
    this.nrp.on(this.channel, function(data, channel) {
      callback(data, channel);
    });
  }

  stop() {
    this.nrp.stop();
  }
}
