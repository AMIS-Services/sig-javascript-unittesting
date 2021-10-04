const { run } = require('../HttpTriggerSIG')
const { ContextLogger } = require('./testhelper')

describe('Main function - query parameters', () => {
  // Query parameters are added after the URL. Multiple parameters can be added
  // Example: www.test.com?name=Anakin&color=black
  const providedName = 'Anakin'
  
  beforeAll(async () => {
    // setup testdata
  })

  afterAll(async () => {
    // delete all testdata, also data created during test. All tests should start and end with an empty database.
  })

  it('Should return greeting, name taken from query parameters', async () => {
    // Mock implementation of the Context object which is always initialized when Function is called
    const context = new ContextLogger()

    const request = {
      query: {
        name: providedName
      }
    }

    // Here, run is the starting point of the Azure Serverless Function. The full code flow can be tested this way.
    // All possible scenarios can be tested in code this way. No need to run the function locally and call it with Postman.
    await run(context, request)

    //After the Function is done, the response is saved in the Context and can be checked
    const responseBody = context.res.body
    expect(responseBody).toBe(`Hello, ${providedName}`)
    // To be expanded further with more assertions
  })
})

describe('Main function - POST request with body', () => {
  const providedName = 'Anakin'
  
  beforeAll(async () => {
    // setup testdata
  })

  afterAll(async () => {
    // delete all testdata, also data created during test
  })

  it('Should return greeting, name taken from body', async () => {
    const context = new ContextLogger()
    const request = {
      query: {},
      body: {
        name: 'Anakin'
      }
    }
    await run(context, request)
    const responseBody = context.res.body
    expect(responseBody).toBe(`Hello, ${providedName}`)
    // To be expanded further with more assertions
  })
})

describe('Main function - Binding data (defined in function.json) ', () => {
  const providedId = '1234'
  
  beforeAll(async () => {
    // setup testdata
  })

  afterAll(async () => {
    // delete all testdata, also data created during test
  })

  it('Should return ID, taken from URL parameter', async () => {
    const context = new ContextLogger(providedId)
    const request = {
      query: {},
      body: {
        name: 'Anakin'
      }
    }
    await run(context, request)
    const responseBody = context.res.body
    expect(responseBody).toBe(`Id = ${providedId}`)
    // To be expanded further with more assertions
  })
})
