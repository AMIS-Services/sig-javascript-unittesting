const getUser = require('../getUser')
const { ContextLogger } = require('./testhelper')
const db = require('../common/database')
jest.mock('../common/database', () => ({
  ...(jest.requireActual('../common/database')),
  executeQuery: jest.fn()
}))

describe('Retrieve a user', () => {
  it('should return a user when id exists', async () => {
    const expectedResponse = {
      firstname: 'Jan',
      lastname: 'Janszen',
      prefix: 'string',
      street: 'Dorpstraat',
      houseno: 14,
      postalcode: '9888AC',
      city: 'Ons Dorp',
      country: 'NL',
      email1: 'jan.janszen@example.com',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString()
    }

    db.executeQuery.mockReturnValue(expectedResponse)
    const executeQueryCall = jest.spyOn(db, 'executeQuery')
    const request = {
      params: {
        id: 1
      }
    }
    const context = new ContextLogger()
    await getUser(context, request)
    expect(context.res.status).toBe(200)
    expect(context.res.body).toEqual(expectedResponse)
    expect(executeQueryCall).toHaveBeenCalled()
    expect(executeQueryCall).toHaveBeenCalledTimes(1)
  })
})
