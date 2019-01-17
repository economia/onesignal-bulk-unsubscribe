# OneSignal bulk unsubscribe

This package can be used to unsubscribe multiple players (users) from your OneSignal app at once based on predefined filters, similar to how Segments work.

OneSignal currently doesn`t provide any API endpoints for working with Segments nor updating players at once. With onesignal-bulk-unsubscribed you can easily unsubscribe players in one go and specify custom filters.

**Caution!** Unsubscribing players is not a destructive job, you can still subscribe them again, but we do NOT provide a way to revert any changes. Use bulk unsubscribe with caution.

## Why

There is an existing `onesignal-node` (package by zeyneloz)[https://github.com/zeyneloz/onesignal-node] but there are two main reasons why this package doesn't use it.

* `onesignal-node` doesn't use an Agent for limiting number of open connections, unsubscribing thousands of players at once would simply be too much. This package uses `axios` with `httpsAgent` and `maxSockets` set to `10` to not consume all your computer's sockets.
* `onesignal-node` is an API client, so it only gives out CSV URL, this package can download the CSV, including waiting for it being generated, ungzip it and parse it using `csvtojson` lib.

## How to install

`npm install --save onesignal-bulk-unsubscribe`

## How to use

```
const bulkUnsubscribe = require('onesignal-bulk-unsubscribe')

bulkUnsubscribe({
  appId: '<APP_ID>', // required
  restApiKey: '<REST_API_KEY>' // required
  filter: <player> => <boolean>,
  mutation: <object> | <player> => <object>,
  timeout: <int>ms,
  backOff: <int>ms,
  dryRun: <boolean>,
  csvFile: <string>,
  csvUrl: <string>,
  parallel: <int>
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

### `mutation`

By default, this package marks all players as unsubscribed (state `-1`), but you can specify a different mutation to selected players.
For example, after trying out this package using a `dryRun`, you can decide to first mark all players by a tag:

```
bulkUnsubscribe({
  mutation: {
    tags: {
      toDelete: "true"
    }
  }
})
```

This way, you can verify your filter really works correctly. You can even re-subscribe all players in this way with caution!

If you wish to modify users based on current properties, a function returning a mutation can be provided:

```
bulkUnsubscribe({
  mutation: player => {
    if (player.game_version === '1.0') {
      return {
        game_version: '1.1'
      }
    }

    if (player.game_version === '2.0') {
      return {
        game_version: '2.1'
      }
    }

    return {}
  })
})
```

### `timeout`

You can specify a timeout in ms for all requests to OneSignal API. Default value is `5000`.

### `backOff`

You can specify a backOff time in ms for downloading CSV file.
In general, generating a CSV report by OneSignal takes several seconds and provided URL returns 403 status code until the export is generated.
By providing a `backOff`, the package wait for specified number of ms before retrying again. Default value is `10000`.

### `dryRun`

When testing filters or simply debugging your code, you might wish to not actually unsubscribe any players.
You can simply provide `dryRun` option to only console.log players that would be unsubscribed.

### `csvFile and` `csvUrl`

Those options also serve for debugging and testing. By default, this package first creates a CSV export and then downloads it from OneSignal,
doing so multiple times might be wasteful, you can either specify CSV export URL or point to existing CSV file on your drive altogether.

### `parallel`

Specify the limit of `maxSockets` in https Agent and parallelism of mutations. Default value is `64`.

## CLI

There is currently no CLI support for this package. Feel free to submit a PR.

## License

This project is licensed under the terms of the MIT license.

See [LICENSE.md](./LICENSE.md).

## Contributing

Feel free to send a PR and we will take a look at it. See package.json and config files for ESLint and Prettier configuration.
