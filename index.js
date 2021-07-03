const { Telegraf } = require("telegraf")
const config = require("config")
require("rootpath")()

const logger = require("log")
const registerTgRoutes = require("api/tg-routes")

const { BOT_TOKEN, REGION, PROJECT_ID, FUNCTION_TARGET, NODE_ENV } = config.get(
  "botConfig"
)

const bot = new Telegraf(BOT_TOKEN)

registerTgRoutes(bot)

const generateWebhookUrl = () =>
  `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${FUNCTION_TARGET}`

if (NODE_ENV === "production") {
  const webhookUrl = generateWebhookUrl()
  logger.info({
    message: `Setting webhook: ${webhookUrl}`
  })
  bot.telegram.setWebhook(webhookUrl)
  exports.botHook = (req, res) => {
    logger.info({
      message: "request: ",
      body: req.body,
      scope: "request.incoming-request"
    })
    bot.handleUpdate(req.body, res)
  }
} else {
  bot.launch()
  logger.info("launching application")
}
