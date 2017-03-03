# Comet Encke

Comet Encke is a comet which contains information about complaints made by
citizens.

## How does it work

Encke subscribes to an AWS SQS message queue. This message queue is populated by
AWS S3 when a new file is added to the bucket.

Encke is only interested in JSON files in the bucket.

Encke assumes that these JSON files conform to the complaints schema, and
processes them before bundling them off to the sun for ingestion.

## Components

1. Worker - logic to read events and S3 files, process them and upload them to
the sun
2. CloudFormation template to define the resources in AWS which are used by this
comet
