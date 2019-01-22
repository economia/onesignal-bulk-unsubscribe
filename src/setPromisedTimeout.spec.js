const setPromisedTimeout = require('./setPromisedTimeout')

describe('setPromisedTimeout', () => {
  const testValue = 'test value'

  beforeAll(() => {
    jest.useFakeTimers()
  })

  test('should return a Promise', () => {
    const returnValue = setPromisedTimeout(() => {})

    expect(returnValue).toBeInstanceOf(Promise)
  })

  test("should resolve with provided function' return value", async () => {
    const returnValue = setPromisedTimeout(() => testValue)
    jest.runAllTimers()
    return expect(returnValue).resolves.toBe(testValue)
  })

  test("should resolve with provided function' resolved value", async () => {
    const asyncValue = setPromisedTimeout(async () => testValue)
    jest.runAllTimers()
    return expect(asyncValue).resolves.toBe(testValue)
  })

  test('should reject when provided function does', async () => {
    const asyncValue = setPromisedTimeout(async () => {
      throw new Error('test error')
    })
    jest.runAllTimers()
    return expect(asyncValue).rejects.toThrowErrorMatchingSnapshot()
  })
})
