import { EmailMessage } from './EmailMessage';

export interface IEmailService {
  send(email: EmailMessage): void
}
