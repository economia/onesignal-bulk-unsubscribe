const httpClient = require('./httpClient')

module.exports = async function unsubscribe(player, options) {
  const client = httpClient(options)

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
}
