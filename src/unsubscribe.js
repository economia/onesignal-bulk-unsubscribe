const httpClient = require('./httpClient')

module.exports = async function unsubscribe(player, options) {
  const client = httpClient(options)

  try {
    if (options.dryRun) {
      console.log(`Would unsubscribe player ${player.id}`)
    } else {
      // 1 = subscribed
      // -1 = unsubscribed
      // -2 = opted out
      await client.put(`players/${player.id}?app_id=${options.appId}`, {
        notification_types: -1,
      })
      console.error(`Unsubscribed player ${player.id}`)
    }
  } catch (error) {
    console.error(`Failed to unsubscribe player ${player.id}`, error)
  }
}
