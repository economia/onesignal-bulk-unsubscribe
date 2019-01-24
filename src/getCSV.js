const fs = require('fs')
const zlib = require('zlib')
const axios = require('axios')
const retry = require(`./asyncRetry`)
const getCSVUrl = require(`./getCSVUrl`)
const setPromisedTimeout = require('./setPromisedTimeout')

function downloadCSV(url, backOff) {
  // Requesting a CSV Download URL triggeres actual generation of CSV report
  // Wait for 10seconds and then try to download it 3 times
  // with 10s back off period bewteen each try
  // use new Promise to convert timeout to a Promise
  console.debug(`Scheduling download of CSV from ${url}`)
  return setPromisedTimeout(async () => {
    return retry(
      async function downloadCSV() {
        const download = await axios({
          method: 'get',
          responseType: 'stream',
          url,
        })
        return download.data
      },
      undefined,
      {
        backOff,
      },
    )
  }, backOff)
}

/**
 * Async function getCSV
 *
 * @return Stream
 */
module.exports = async function getCSV({
  timeout = 5000,
  backOff = 10000,
  appId,
  restApiKey,
  csvUrl = null,
  csvFile = null,
} = {}) {
  // Read existing CSV file
  if (csvFile && fs.existsSync(csvFile)) {
    console.debug(`CSV File provided, reading ${csvFile}.`)
    return fs.createReadStream(csvFile)
  }

  // If no previous URL was provided, get one from OneSignal
  if (!csvUrl) {
    try {
      csvUrl = await getCSVUrl({ timeout, appId, restApiKey })
    } catch (error) {
      console.error('Failed to get CSV URL, stopping execution', error)
      process.exit()
    }
  }

  // Download CSV
  let csv
  try {
    csv = await downloadCSV(csvUrl, backOff)
  } catch (error) {
    console.error('Failed to download CSV, stopping execution', error)
    process.exit()
  }

  // Decode CSV from gzip
  const gunzip = zlib.createGunzip()
  csv.pipe(gunzip)

  // If file provided write output
  if (csvFile) {
    console.debug(`Saving data to a csv file ${csvFile}`)
    gunzip.pipe(fs.createWriteStream(csvFile))
  }

  return gunzip
}
