const httpClient = require('./httpClient')
const transform = require('parallel-transform')

module.exports = function({ filter = () => true, ...options } = {}) {
  if (typeof filter !== 'function') {
    throw new Error(`Option "filter" must be a function when specified!`)
  }

  const client = httpClient(options)

  return transform(options.parallel || 64, async function unsubscribe(player, callback) {
    if (!filter(player)) {
      return callback()
    }

    // 1 = subscribed
    // -1 = unsubscribed
    // -2 = opted out
    let mutation = options.mutation || {
      notification_types: -1,
    }

    if (typeof mutation === 'function') {
      mutation = mutation(player)
    }

    try {
      if (options.dryRun) {
        console.log(`Would unsubscribe player ${player.id}`)
      } else {
        await client.put(`players/${player.id}?app_id=${options.appId}`, mutation)
        console.error(`Unsubscribed player ${player.id}`)
      }
    } catch (error) {
      console.error(`Failed to unsubscribe player ${player.id}`, error)
    }

    callback()
  })
}
