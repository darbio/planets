import * as bunyan from 'bunyan';
import { Subscriber } from '../../shared/subscriber';
import { EmailMessage, EmailService } from '../../shared/email-service'

export class Mercury {
  logger: bunyan;
  subscriber: Subscriber;
  emailService: EmailService;

  constructor() {
    this.logger = bunyan.createLogger({
      name : 'Planet Mercury'
    });

    this.emailService = new EmailService();

    this.logger.info('Subscribing to \'domain:v1:comet:received\'');
    this.subscriber = new Subscriber('domain:v1:comet:received');
  }

  start() {
    this.subscriber.start((data, channel) => {
      this.logger.info('Received an event on ' + channel);

      let email = new EmailMessage(
        [
          'james.darbyshire@esafety.gov.au',
          'matthew.wegrzyn@esafety.gov.au'
        ],
        'no-reply@esafety.gov.au',
        'This is an email test',
        'This is the email body.'
      );

      this.logger.info('Sending email', email);
      this.emailService.send(email);
    });
  }
}
