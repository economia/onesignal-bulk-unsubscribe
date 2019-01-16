// https://documentation.onesignal.com/reference#section-response-parameters
// Parameter           Type     Description
// invalid_identifier  boolean  If true, this is the equivalent of a player being Unsubscribed
//
// In CSV export, values are "t" or "f" for true or false respectivelly

module.exports = function isSubscribed(player) {
  return player.invalid_identifier === 'f'
}
