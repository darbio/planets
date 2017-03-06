import * as bunyan from 'bunyan';
import { Subscriber } from '../../shared/subscriber';
import { NewComplaintEvent } from '../../flares/new-complaint';

import { EmailMessage, IEmailMessageParams } from '../../shared/email/EmailMessage'
import { IEmailService } from '../../shared/email/IEmailService'
import { ISmtpEmailServiceParams, SmtpEmailService } from '../../shared/email/SmtpEmailService'

export class Mercury {
  logger: bunyan = bunyan.createLogger({ name : 'Planet Mercury' });
  subscriber: Subscriber;
  emailService: IEmailService;

  constructor() {
    let emailServiceParams: ISmtpEmailServiceParams = {
      host: process.env.SMTP_HOST,
      username: process.env.SMTP_USERNAME,
      password: process.env.SMTP_PASSWORD,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_TLS
    }
    this.emailService = new SmtpEmailService(emailServiceParams);

    this.logger.info(`Subscribing to '${NewComplaintEvent.event_name}'`);
    this.subscriber = new Subscriber(NewComplaintEvent.event_name);
  }

  start() {
    this.subscriber.start((data, channel) => {
      this.logger.info('Received an event on ' + channel);

      let emailParams: IEmailMessageParams = {
        to: [
          process.env.MERCURY_EMAIL_TO
        ],
        from: process.env.MERCURY_EMAIL_FROM,
        subject: 'This is the subject',
        text: 'This is the email text.',
        html: '<p>This is the email HTML</p>'
      };
      let email= new EmailMessage(emailParams);

      this.logger.info('Sending email', email);

      try {
        this.emailService.send(email);
      }
      catch (error) {
        this.logger.error(error)
      }
    });
  }
}
