export class EmailService {
  constructor() {

  }

  send(email: EmailMessage) {
    console.log("I am sending an email");
  }
}

export class EmailMessage {
  to: string[];
  from: string;
  subject: string;
  body: string;

  constructor(to: string[], from: string, subject: string, body: string) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.body = body;
  }
}
