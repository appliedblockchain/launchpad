# Guidelines

## General Rules

- Avoid code repetition
- Avoid large files and functions

## Frontend

- Use functional components and hooks
- Cover code with unit tests
- Errors must be sent to Sentry
  - Error Boundary??
- Group components of a page under the same directory
- Use redux toolkit to cache network requests

## Backend

- Logging
  - Papertrail collects automatically servers output
  - Use logging library to log instead of console.log
  - Separate log type (warning/error/info/debug)
- Errors
  - Errors must be sent to Sentry
  - All errors must be constants
- API Documentation
  - Swagger
- Heavy processing work must be send to a queue that eventually will be processed in a worker
- Validate requests inputs (payloads and parameters)
- Monitoring
  - healthcheck endpoint must return the state of the API and all other external dependencies
- Cover code with unit tests
- Cover main workflows with integration tests

## API Specs library (internal package)

- All API responses/parameters/payloads types must be specified in the api-specs package
