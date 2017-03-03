# Galaxy

A galaxy contains solar systems, which have planets who are reliant on their sun
to survive.

External influences, such as comets, can enter a solar system and provide input
from elsewhere.

Telescopes provide insight into objects in the solar system. Telescopes can be
conceptualised in this example as user interfaces or reporting tools.

## Running the example

This example uses node foreman to run the workers and web processes defined in
the Procfile.

To start the solution, run the following command:

`nf start`

## Technology

In our landscape, the comets come from an external complaint. They make their
way directly to the sun, which ingests and stores them. Sun flares come out of
the sun, which can be observed by planets, who can act on that information.

### Pub/Sub system

This example uses Redis as a local pub/sub messaging queue. It relies on Redis
being available at the `REDIS_URL` environment variable.

The publisher and subscriber are designed to be switched in and out with the
different implementations. In this way, it would be easy to create a
publisher/subscriber for another messaging system such as RabbitMQ or AWS SNS.

#### Installation

To install Redis on a local OSX development environment, do the following:

1. `brew install redis`
2. `redis-server /usr/local/etc/redis.conf`

Redis is now running locally on `redis://localhost:6379`.
