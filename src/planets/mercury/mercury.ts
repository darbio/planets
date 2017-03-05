import * as bunyan from 'bunyan';
import { Subscriber } from '../../shared/subscriber';

import { EmailMessage } from '../../shared/email/EmailMessage'
import { IEmailService } from '../../shared/email/IEmailService'
import { SmtpEmailService } from '../../shared/email/SmtpEmailService'

export class Mercury {
  logger: bunyan;
  subscriber: Subscriber;
  emailService: IEmailService;

  constructor() {
    this.logger = bunyan.createLogger({
      name : 'Planet Mercury'
    });

    this.emailService = new SmtpEmailService('smtp.gmail.com', 'username', 'password');

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
        '"eSafety Australia" <no-reply@esafety.gov.au>',
        'This is the subject',
        'This is the email text.',
        '<p>This is the email HTML</p>'
      );

      this.logger.info('Sending email', email);
      this.emailService.send(email);
    });
  }
}
