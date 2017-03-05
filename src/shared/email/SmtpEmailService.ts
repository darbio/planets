import { IEmailService } from './IEmailService';
import { EmailMessage } from './EmailMessage';

import * as nodemailer from 'nodemailer';

export class SmtpEmailService implements IEmailService {
  transporter: nodemailer.Transporter;

  constructor(host: string, username: string = null, password: string = null, port: number = 25, secure: boolean = false) {
    this.transporter = nodemailer.createTransport({
      host: host,
      port: port,
      auth: {
        user: username,
        pass: password
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
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}
