export interface IEmailMessageParams {
  to: string[]
  from: string
  subject: string
  text: string
  html: string
}

export class EmailMessage {
  to: string[];
  from: string;
  subject: string;
  text: string;
  html: string;

  constructor(params: IEmailMessageParams) {
    this.to = params.to;
    this.from = params.from;
    this.subject = params.subject;
    this.text = params.text;
    this.html = params.html;
  }
}
