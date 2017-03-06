import * as request from 'request';
import * as AWS from 'aws-sdk';
import * as bunyan from 'bunyan';

export class Encke {
  is_started: boolean = false;
  sqs: AWS.SQS;
  logger: bunyan = bunyan.createLogger({ name : 'Comet Encke' });

  constructor() {
    this.logger.info("Starting comet: Encke");

    let config: AWS.ClientConfigPartial = {
      credentials: new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)
    };
    AWS.config.update(config);

    this.sqs = new AWS.SQS();
  }

  // Starts the comet process
  start() {
    this.logger.info('Starting queue listener');
    this.is_started = true;
    this.receiveMessages();
  }

  // Stops the comet process
  stop() {
    this.logger.info('Stopping queue listener');
    this.is_started = false;
  }

  receiveMessages() {
    this.sqs.receiveMessage(
      {
        QueueUrl: process.env.ENCKE_SQS_QUEUE_URL,
        WaitTimeSeconds: 20 // Long polling
      },
      (err: any, data: any) => {
        // Process the data
        if (data.Messages && data.Messages.length > 0) {
          this.logger.info(`Retrieved ${data.Messages.length} messages from queue`);

          for (let message of data.Messages) {
            this.logger.info(`Processing message`, message);

            // Process the message
            this.process(message);

            // Remove the message from the queue
            this.sqs.deleteMessage(
              {
                QueueUrl: process.env.ENCKE_SQS_QUEUE_URL,
                ReceiptHandle: message.ReceiptHandle
              },
              (err, data) => {
                console.info(`Deleted message`, data)
              }
            );
          }
        }

        if (this.is_started) {
          this.receiveMessages();
        }
      }
    );
  }

  // Processes a JSON file
  process(message: any) {
    // Extract the complaint from the message body
    var complaint = JSON.parse(message.Body);

    // Validate the complaint
    // TODO

    // Send to the sun
    request.post({
      url : `${process.env.SUN_URI}/api/v1/complaints`,
      body : complaint,
      json : true
    },
    (err, httpResponse, body) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
