const retry = require('./asyncRetry')
const httpClient = require('./httpClient')

async function getCSVUrl(client, appId) {
  const response = await client.post(`players/csv_export?app_id=${appId}`)
  return response.data.csv_file_url
}

module.exports = ({ timeout, appId, restApiKey }) => {
  const client = httpClient({ timeout, restApiKey })

  return retry(getCSVUrl, [client, appId])
}
