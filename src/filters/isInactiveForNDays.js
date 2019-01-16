function daysToMS(days) {
  return days * 60 * 60 * 24 * 1000
}

module.exports = function isInactiveForNDays(days = 90) {
  const nDaysAgo = Date.now() - daysToMS(days)

  return function (player) {
    return new Date(player.last_active) < nDaysAgo
  }
}
