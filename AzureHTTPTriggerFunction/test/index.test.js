// require('dotenv').config()
const { run } = require('../HttpTriggerSIG')
const { ContextLogger } = require('./testhelper')

describe('Happy Flow main function', () => {
  const providedId = '1'
  // const providedName
  
  beforeAll(async () => {
    // setup testdata
  })

  afterAll(async () => {
    // delete all testdata, also data created during test
  })

  it('Should return correct response', async () => {
    const context = new ContextLogger(providedId)
    const request = {
      body: {
        name: 'Jeroen'
      }
    }
    await run(context, request)
    const response = context.res.body.data
    console.log(response)
    expect(response.name).toBe(name1)
    // To be expanded further with more assertions
  })
})
