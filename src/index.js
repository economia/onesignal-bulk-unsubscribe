const csv2json = require('csvtojson')
const getCSV = require(`./getCSV`)
const unsubscribe = require(`./unsubscribe`)

module.exports = async function(options) {
  if (!options.appId) {
    throw new Error(`Missing required option "appId"!`)
  }
  if (!options.restApiKey) {
    throw new Error(`Missing required option "restApiKey"!`)
  }

  const csvStream = await getCSV(options)

  csv2json(undefined, {
    objectMode: true,
  })
    .fromStream(csvStream)
    .pipe(unsubscribe(options))
}
