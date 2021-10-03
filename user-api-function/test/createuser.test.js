const createUser = require('../createUser')
const { ContextLogger } = require('./testhelper')
const db = require('../common/database')
jest.mock('../common/database', () => ({
  ...(jest.requireActual('../common/database')),
  executeTransaction: jest.fn()
}))

describe('Create a user', () => {
  it('should return an id when the call is succesful', async () => {
    const expectedResponse = { id: 1 }
    const user = {
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
    db.executeTransaction.mockReturnValue({})
    const executeTransactionCall = jest.spyOn(db, 'executeTransaction')
    const request = {
      body: user
    }
    const context = new ContextLogger()
    await createUser(context, request)
    expect(context.res.status).toBe(201)
    expect(context.res.body).toEqual(expectedResponse)
    expect(executeTransactionCall).toHaveBeenCalled()
    expect(executeTransactionCall).toHaveBeenCalledTimes(1)
  })
})
