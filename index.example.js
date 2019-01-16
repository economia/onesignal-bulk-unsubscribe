const bulkUnsubscribe = require(`./src/index`)
const { isSubscribed, isInactiveForNDays } = require(`./src/filters`)

const isInactiveFor90Days = isInactiveForNDays(90)

bulkUnsubscribe({
	filter(user) {
		return isSubscribed(user) && isInactiveFor90Days(user)
	},
	appId: '<APP_ID>',
	restApiKey: '<REST_API_KEY>',
	csvFile: './export.csv',
	dryRun: true
})
