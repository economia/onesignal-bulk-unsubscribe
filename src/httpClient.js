const https = require('https')
const axios = require('axios')

let client

function createClient({ timeout, restApiKey, parallel = 64 }) {
  return axios.create({
    baseURL: `https://onesignal.com/api/v1/`,
    timeout,
    headers: {
      'Content-Type': `application/json; charset=utf-8`,
      Authorization: `Basic ${restApiKey}`,
    },
    httpsAgent: new https.Agent({
      keepAlive: true,
      maxSockets: parallel,
    }),
  })
}

module.exports = options => {
  if (!client) {
    client = createClient(options)
  }
  return client
}
