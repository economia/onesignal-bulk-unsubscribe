const httpClient = require('./httpClient')

const axios = require('axios')
jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({})), // mock axios.create to return plain empty object
  }
})

describe('httpClient', () => {
  test('it should only call axios.create once', () => {
    expect(axios.create).toHaveBeenCalledTimes(0)
    httpClient({})
    expect(axios.create).toHaveBeenCalledTimes(1)
    httpClient({})
    expect(axios.create).toHaveBeenCalledTimes(1)
  })
})
