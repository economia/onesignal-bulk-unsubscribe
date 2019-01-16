const isSubscribed = require(`./isSubscribed`)
const isInactiveForNDays = require(`./isInactiveForNDays`)

module.exports = {
  isSubscribed,
  isInactiveForNDays,
  isInactiveFor90Days: isInactiveForNDays(90),
  isInactiveFor30Days: isInactiveForNDays(30),
  isInactiveFor7Days: isInactiveForNDays(7),
}
