const { run } = require('../HttpTriggerSIG')
const { ContextLogger } = require('./testhelper')

describe('Main function - query parameter provided', () => {
  it('Should write 1 info line and 1 warning. No errors', async () => {
    const context = new ContextLogger()

    const request = {
      query: {
        name: 'Anakin'
      }
    }
    // All logging is saved in an array in the mocked Context object
    await run(context, request)
    // Checking for written loglines (or absent ones)
    expect(context.log_messages.filter(m => m.startsWith('INFO')).length).toBe(1)
    expect(context.log_messages.filter(m => m.startsWith('ERROR')).length).toBe(0)
    expect(context.log_messages.filter(m => m.includes('WARNING - No ID found in URL')).length).toEqual(1)
  })
})