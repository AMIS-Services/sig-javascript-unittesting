// This line looks for the .env file and makes all variables available in a process.env object
require('dotenv').config()

const { environmentVariablesExample, getEnvironmentVariables } = require('../HttpTriggerSIG')
const { ContextLogger } = require('./testhelper')

describe('Main function - use environment variables', () => {

  it('Should return the correct response', async () => {
    // Create config object for use in unittest
    const config = getEnvironmentVariables()

    const result = await environmentVariablesExample()
    
    expect(result).toBe(`${config.sqlDatabaseServer}:${config.sqlDatabasePort}/user=${config.sqlDatabaseUser}`)

  })
})