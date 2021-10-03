const createUser = require('../createUser')
const { ContextLogger } = require('./testhelper')
const db = require('../common/database')
jest.mock('../common/database', () => ({
  ...(jest.requireActual('../common/database')),
  executeTransaction: jest.fn()
}))
const validation = require('../createUser/validation')
jest.mock('../createUser/validation', () => ({
  ...(jest.requireActual('../createUser/validation')),
  validateRequest: jest.fn()
}))

describe('Create a user', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return status 201 with id when succesful', async () => {
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
    validation.validateRequest.mockReturnValue(true)
    db.executeTransaction.mockReturnValue(expectedResponse)
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

  it('should return status 400 when mandatory fields are missing', async () => {
    const expectedResponse = {
      error: 'One or more mandatory fields are missing.'
    }
    const user = {
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
    validation.validateRequest.mockReturnValue(false)
    const executeTransactionCall = jest.spyOn(db, 'executeTransaction')
    const validateRequestCall = jest.spyOn(validation, 'validateRequest')
    const request = {
      body: user
    }
    const context = new ContextLogger()
    await createUser(context, request)
    expect(context.res.status).toBe(400)
    expect(context.res.body).toEqual(expectedResponse)
    expect(executeTransactionCall).not.toHaveBeenCalled()
    expect(validateRequestCall).toHaveBeenCalled()
    expect(validateRequestCall).toHaveBeenCalledTimes(1)
  })

  it('should return status 409 when existing record is found', async () => {
    const executeTransactionCall = jest.spyOn(db, 'executeTransaction')
    const validateRequestCall = jest.spyOn(validation, 'validateRequest')
    const expectedResponse = {
      error: 'User already exists.'
    }
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
    validation.validateRequest.mockReturnValue(true)
    db.executeTransaction.mockRejectedValue({
      code: '23505',
      constraints: 'uk_users',
      message: 'duplicate entry'
    })
    const request = {
      body: user
    }
    const context = new ContextLogger()
    await createUser(context, request)
    expect(context.res.status).toBe(409)
    expect(context.res.body).toEqual(expectedResponse)
    expect(executeTransactionCall).toHaveBeenCalled()
    expect(validateRequestCall).toHaveBeenCalled()
  })
})
