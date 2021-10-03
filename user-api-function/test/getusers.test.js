const getUsers = require('../getUsers')
const { ContextLogger } = require('./testhelper')

describe('Retrieving list of users', () => {
  it('should return an empty list', async () => {
    const expectedResponse = []
    const request = {}
    const context = new ContextLogger()
    await getUsers(context, request)
    expect(context.res.status).toBe(200)
    expect(context.res.body).toEqual(expectedResponse)
  })
})
