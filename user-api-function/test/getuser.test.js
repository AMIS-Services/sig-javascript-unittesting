const getUser = require('../getUser')
const { ContextLogger } = require('./testhelper')
const db = require('../common/database')
jest.mock('../common/database', () => ({
  ...(jest.requireActual('../common/database')),
  executeQuery: jest.fn()
}))

describe('Retrieve a user', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

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

  it('should return 404 when record is not found', async () => {
    const expectedResponse = {
      error: 'User not found'
    }
    const request = {
      params: {
        id: 2
      }
    }
    db.executeQuery.mockReturnValue(null)
    const executeQueryCall = jest.spyOn(db, 'executeQuery')
    const context = new ContextLogger()
    await getUser(context, request)
    expect(context.res.status).toBe(404)
    expect(context.res.body).toEqual(expectedResponse)
    expect(executeQueryCall).toHaveBeenCalled()
    expect(executeQueryCall).toHaveBeenCalledTimes(1)
  })

  it('should return an error when a non-numeric id is supplied', async () => {
    const expectedResponse = {
      error: 'invalid input syntax for integer: "ABC"'
    }
    const request = {
      params: {
        id: 'ABC'
      }
    }
    db.executeQuery.mockRejectedValue({
      code: '22P02',
      message: 'invalid input syntax for integer: "ABC"'
    })
    const executeQueryCall = jest.spyOn(db, 'executeQuery')
    const context = new ContextLogger()
    await getUser(context, request)
    expect(context.res.status).toBe(500)
    expect(context.res.body).toEqual(expectedResponse)
    expect(executeQueryCall).toHaveBeenCalled()
    expect(executeQueryCall).toHaveBeenCalledTimes(1)
  })
})
