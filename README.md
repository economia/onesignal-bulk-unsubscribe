# OneSignal bulk unsubscribe

This package can be used to unsubscribe multiple players (users) from your OneSignal app at once based on predefined filters, similar to how Segments work.

OneSignal currently doesn`t provide any API endpoints for working with Segments nor updating players at once. With onesignal-bulk-unsubscribed you can easily unsubscribe players in one go and specify custom filters.

**Caution!** Unsubscribing players is not a destructive job, you can still subscribe them again, but we do NOT provide a way to revert any changes. Use bulk unsubscribe with caution.

## How to install

`npm install --save onesignal-bulk-unsubscribe`

## How to use

```
const bulkUnsubscribe = require('onesignal-bulk-unsubscribe')

bulkUnsubscribe({
  appId: '<APP_ID>', // required
  restApiKey: '<REST_API_KEY>' // required
  filter: (<player>) => <boolean>,
  dryRun: <boolean>,
  csvFile: <string>,
  csvUrl: <string>
})
```

### `appId` and `restApiKey`

You can find those options in your OneSignal account administration. Keep them secret!

### `filter`

You should provide a filtering function to filter players you want to unsubscribed.
If you do not provide a function, all players will be unsubscribed.
There are default filters you can use straight from the package, for example:

```
const isInactiveFor30Days = require('onesignal-bulk-unsubscribe/filters').isInactiveFor30Days
```

List of available filters:

* `isSubscribed` (it might be a good idea to unly unsubscribe players that are subscribed to limit network requests)
* `isInactiveFor90Days`
* `isInactiveFor30Days`
* `isInactiveFor7Days`
* `isInactiveForNDays(days)` (this is a closure that returns a filter)

You can also provide a complex or custom filter, such as

```
function filter(player) {
  return isSubscribed(player) && isInactiveFor30Days(player) && player.language !== 'en'
}
```

### `dryRun`

When testing filters or simply debugging your code, you might wish to not actually unsubscribe any players.
You can simply provide `dryRun` option to only console.log players that would be unsubscribed.

### `csvFile and` `csvUrl`

Those options also serve for debugging and testing. By default, this package first creates a CSV export and then downloads it from OneSignal,
doing so multiple times might be wasteful, you can either specify CSV export URL or point to existing CSV file on your drive altogether.

## CLI

There is currently no CLI support for this package. Feel free to submit a PR.

## License

This project is licensed under the terms of the MIT license.

See [LICENSE.md](./LICENSE.md).

## Contributing

Feel free to send a PR and we will take a look at it. See package.json and config files for ESLint and Prettier configuration.
