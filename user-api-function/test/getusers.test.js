const getUsers = require('../getUsers')
const { ContextLogger } = require('./testhelper')
const db = require('../common/database')
jest.mock('../common/database', () => ({
  ...(jest.requireActual('../common/database')),
  executeQuery: jest.fn()
}))

describe('Retrieving list of users', () => {
  it('should return an empty list', async () => {
    const expectedResponse = []
    db.executeQuery.mockReturnValue(expectedResponse)
    const executeQueryCall = jest.spyOn(db, 'executeQuery')
    const request = {}
    const context = new ContextLogger()
    await getUsers(context, request)
    expect(context.res.status).toBe(200)
    expect(context.res.body).toEqual(expectedResponse)
    expect(executeQueryCall).toHaveBeenCalled()
    expect(executeQueryCall).toHaveBeenCalledTimes(1)
  })
})
