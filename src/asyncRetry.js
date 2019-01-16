const setPromisedTimeout = require('./setPromisedTimeout')

module.exports = async function asyncRetry(
  fn = () => null,
  args = [],
  { maxRetries = 3, attempt = 1, backOff = 100 } = {},
) {
  console.debug(`Trying calling ${fn.name}, attempt #${attempt} out of ${maxRetries}`)
  try {
    return await fn(...args)
  } catch (e) {
    if (maxRetries <= attempt) {
      e.message = `Function ${fn.name} failed to resolve in ${maxRetries} retries! ${e.message}`
      throw e
    }
    console.debug(
      `Call to ${fn.name}, attempt #${attempt} failed: ${
        e.message
      }, scheduling new attempt in ${backOff}ms`,
    )
    return setPromisedTimeout(() => {
      return asyncRetry(fn, args, {
        maxRetries,
        attempt: attempt + 1,
        backOff,
      })
    }, backOff)
  }
}
