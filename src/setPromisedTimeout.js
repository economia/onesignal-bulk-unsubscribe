module.exports = function setPromisedTimeout(fn, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const resolveWith = await fn()
        resolve(resolveWith)
      } catch (e) {
        reject(e)
      }
    }, timeout)
  })
}
