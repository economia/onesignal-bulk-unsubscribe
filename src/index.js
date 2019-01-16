const csv2json = require('csvtojson')
const getCSV = require(`./getCSV`)
const unsubscribe = require(`./unsubscribe`)

module.exports = async function({ filter = () => true, ...options } = {}) {
  if (!options.appId) {
    throw new Error(`Missing required option "appId"!`)
  }
  if (!options.restApiKey) {
    throw new Error(`Missing required option "restApiKey"!`)
  }
  if (typeof filter !== 'function') {
    throw new Error(`Option "filter" must be a function when specified!`)
  }

  const csvStream = await getCSV(options)

  csv2json()
    .fromStream(csvStream)
    .subscribe(async player => {
      if (filter(player)) {
        await unsubscribe(player, options)
      }
      return true
    })
}
