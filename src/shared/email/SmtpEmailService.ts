import { IEmailService } from './IEmailService';
import { EmailMessage } from './EmailMessage';

import * as nodemailer from 'nodemailer';
import * as bunyan from 'bunyan';

export interface ISmtpEmailServiceParams {
  host: string
  username: string
  password: string
  port: number
  secure: boolean
}

export class SmtpEmailService implements IEmailService {
  transporter: nodemailer.Transporter;
  logger: bunyan = bunyan.createLogger({ name : 'SmtpEmailService' });

  constructor(params: ISmtpEmailServiceParams) {
    this.transporter = nodemailer.createTransport({
      host: params.host,
      port: params.port,
      auth: {
        user: params.username,
        pass: params.password
      }
    });
  }

  send(email: EmailMessage) {
    // setup email data with unicode symbols
    let mailOptions = {
      from: email.from, // sender address
      to: email.to, // list of receivers
      subject: email.subject, // Subject line
      text: email.text, // plain text body
      html: email.html // html body
    };

    // send mail with defined transport object
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      }

      this.logger.trace('Message %s sent: %s', info.messageId, info.response);
    });
  }
}
