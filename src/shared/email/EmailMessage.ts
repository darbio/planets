export class EmailMessage {
  to: string[];
  from: string;
  subject: string;
  text: string;
  html: string;

  constructor(to: string[], from: string, subject: string, text: string, html: string) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }
}
