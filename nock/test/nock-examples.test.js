const nock = require('nock')
const axios = require('axios').default
const fetch = require('node-fetch')

describe('Nock example get request', () => {

  beforeEach(async () => {
    nock.cleanAll()
  })

  it('should return OK with license info body when performing a GET request', async () => {
    const responseBody = {
      license: {
        key: 'mit',
        name: 'MIT License',
        spdx_id: 'MIT',
        url: 'https://api.github.com/licenses/mit',
        node_id: 'MDc6TGljZW5zZTEz',
      }
    }
    nock('https://api.github.com')
      .get('/repos/atom/atom/license')
      .reply(200, responseBody)
    const resp = await axios.get('https://api.github.com/repos/atom/atom/license')
    expect(resp.status).toBe(200)
    expect(resp.data).toEqual(responseBody)
  })

  it('should return an error without an error code', async () => {
    nock(/localhost\:3000/).get('/users').replyWithError({
      message: 'something awful happened',
      code: 'ERROR01',
    })
    expect.assertions(1)
    try {
      const resp = await axios.get('https://localhost:3000/users')
    } catch (error) {
      expect(error.code).toBe('ERROR01')
    }
  })

  it('should return an error with error code 400', async () => {
    nock(/localhost\:3000/).get('/users').reply(
      400, {
      message: 'something awful happened',
      code: 'ERROR02',
    })
    expect.assertions(1)
    try {
      const resp = await axios.get('https://localhost:3000/users')
    } catch (error) {
      expect(error.response.status).toBe(400)
    }
  })

  it('should return an error when an invalid POST request is made with axios', async () => {
    nock('https://localhost:3000')
      .post('/user')
      .reply((uri, requestBody) => {
        return [
          400,
          `Request body invalid: ${JSON.stringify(requestBody)} for uri ${uri}.`
        ]
      })
    expect.assertions(2)
    const body = {
      firstName: 'Jan',
      lastName: 'Jansen'
    }
    try {
      const resp = await axios.post('https://localhost:3000/user', body)
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data).toBe(`Request body invalid: ${JSON.stringify(body)} for uri /user.`)
    }
  })

  it('should return an error code when an invalid POST request is made using node-fetch', async () => {
    nock(/localhost\:3000/).get('/users').reply(
      400, {
      message: 'something awful happened',
      code: 'ERROR03',
    })
    const resp = await fetch('https://localhost:3000/users')
    expect(resp.status).toBe(400)
    const data = await resp.json()
    expect(data).toEqual({
      message: 'something awful happened',
      code: 'ERROR03',
    })
  })

  it('should return an error when an invalid POST request is made with node-fetch', async () => {
    nock('https://localhost:3000')
      .post('/user')
      .reply((uri, requestBody) => {
        return [
          400,
          `Request body invalid: ${JSON.stringify(requestBody)} for uri ${uri}.`
        ]
      })
    const body = {
      firstName: 'Jan',
      lastName: 'Jansen'
    }
    const resp = await fetch('https://localhost:3000/user', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
    expect(resp.status).toBe(400)
    const data = await resp.text()
    expect(data).toEqual(expect.stringContaining('Request body invalid'))
  })
})
