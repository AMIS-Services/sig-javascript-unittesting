# Code example written for Integration SIG October 10, 2021 - Javascript Unit testing

These examples serve two goals
- Provide information how Azure Serverless Function can be tested locally and automatically (with unittests)
- Add a perspective on the discussion about using unittests for a higher testing level (integration test). Traditionally, unit tests are written for small units of code and mocks are used to isolate this code as much as possible. These examples go through the full flow of the function. From the Function Trigger to the HTTP response. On this level, "unittests" could replace other tests later in the deployment chain.

The examples cover the use of parameters in HTTP request, use of environment variables and use of logging in tests.

Recommended order to read through the examples
- parameters.test.js
- environment-variables.test.js
- logging.test.js
