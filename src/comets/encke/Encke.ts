import * as request from 'request';

export class Encke {
  timer: any;

  constructor() {
    console.log("Starting comet: Encke");
  }

  // Starts the comet process
  start() {
    // Fakes it for now
    // TODO retrieve from S3 on SNS notification
    var that = this;
    this.timer = setInterval(function() {
      var complaint = {
        type : "Online content",
        from : {
          name : "John Doe",
          email : "john.doe@live.com"
        },
        attachments : [
          "https://s3.aws.amazon.com/foo/bar.jpg"
        ]
      };

      that.process(complaint);
    }, 10000);
  }

  // Stops the comet process
  stop() {
    clearInterval(this.timer);
  }

  // Processes a JSON file
  process(complaint) {
    // Do something here
    var processedComplaint = complaint;

    // Send to the sun
    request.post({
      url : 'http://localhost:3000/api/v1/comets',
      body : processedComplaint,
      json : true
    },
    (err, httpResponse, body) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
