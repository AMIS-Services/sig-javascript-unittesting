const nock = require('nock')
const axios = require('axios').default

describe('Retrieving list of users', () => {
  beforeEach(async () => {
    nock.cleanAll()
  })

  it('should return an empty list', async () => {
    const expectedResponse = []
    const uri = 'https://api.amis.dev'
    nock(uri)
      .get('/users')
      .reply(200, expectedResponse)
    const resp = await axios.get(`${uri}/users`)
    expect(resp.status).toBe(200)
    expect(resp.data).toEqual(expectedResponse)
  })

  it('should return an list with users', async () => {
    const expectedResponse = [{
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
    }]
    const uri = 'https://api.amis.dev'
    nock(uri)
      .get('/users')
      .reply(200, expectedResponse)
    const resp = await axios.get(`${uri}/users`)
    expect(resp.status).toBe(200)
    expect(resp.data).toEqual(expectedResponse)
    expect(resp.data.length).toBe(1)
    expect(resp.data[0].lastname).toBe('Janszen')
  })

  it('should return an error', async () => {
    const expectedResponse = {
      message: 'Unexpected error while retrieving users.'
    }
    const uri = 'https://api.amis.dev'
    nock(uri)
      .get('/users')
      .reply(500, expectedResponse)
    expect.assertions(2)
    try {
      await axios.get(`${uri}/users`)
    } catch (error) {
      expect(error.response.status).toBe(500)
      expect(error.response.data.message).toBe(expectedResponse.message)
    }
  })
})

describe('Retrieve a single user', () => {
  const user1 = {
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
  const uri = 'https://api.amis.dev'

  beforeEach(async () => {
    nock.cleanAll()
  })

  it('should return a user record', async () => {
    nock(uri)
      .get('/user/1')
      .reply(200, user1)
    const resp = await axios.get(`${uri}/user/1`)
    expect(resp.status).toBe(200)
    expect(resp.data).toEqual(user1)
  })

  it('should return 404 when record is not found', async () => {
    nock(uri)
      .get('/user/2')
      .reply(404, {
        message: 'User not found.'
      })
    expect.assertions(2)
    try {
      await axios.get(`${uri}/user/2`)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toEqual({
        message: 'User not found.'
      })
    }
  })

  it('should return an error when a non-numeric id is supplied', async () => {
    nock(uri)
      .get('/user/abc')
      .reply(400, {
        message: 'Invalid id (abc) given.'
      })
    expect.assertions(2)
    try {
      await axios.get(`${uri}/user/abc`)
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data).toEqual({
        message: 'Invalid id (abc) given.'
      })
    }
  })
})

describe('Add a new user', () => {
  const user1 = {
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
  const uri = 'https://api.amis.dev'

  beforeEach(async () => {
    nock.cleanAll()
  })

  it('should return status 201 with id when succesful', async () => {
    nock(uri)
      .post('/user')
      .reply(201, {
        id: 1
      })
    const resp = await axios.post(`${uri}/user`, user1)
    expect(resp.status).toBe(201)
    expect(resp.data).toBeDefined()
    expect(resp.data.id).toBeDefined()
  })

  it('should return status 400 when mandatory fields are missing', async () => {
    const invalidUser = { ...user1 }
    delete invalidUser.lastname
    nock(uri)
      .post('/user')
      .reply(400, {
        message: 'Mandatory fields are missing.'
      })
    expect.assertions(2)
    try {
      await axios.post(`${uri}/user`, invalidUser)
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data).toEqual({
        message: 'Mandatory fields are missing.'
      })
    }
  })

  it('should return status 409 when existing record is found', async () => {
    nock(uri)
      .post('/user')
      .reply(409, {
        message: 'User already exists.'
      })
    expect.assertions(2)
    try {
      await axios.post(`${uri}/user`, user1)
    } catch (error) {
      expect(error.response.status).toBe(409)
      expect(error.response.data).toEqual({
        message: 'User already exists.'
      })
    }
  })
})
