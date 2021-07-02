const { Telegraf } = require("telegraf")
const config = require("config")
require("rootpath")()

const logger = require("log")
const registerTgRoutes = require("api/tg-routes")

const { BOT_TOKEN, REGION, PROJECT_ID, FUNCTION_TARGET, NODE_ENV } = config.get(
  "botConfig"
)

const bot = new Telegraf(BOT_TOKEN)

//bot.hears("hi", (ctx) => ctx.reply("Hey there"))
//bot.on("message", (ctx) => ctx.reply("Not supported command")) // you need this to handle not supported command. Unless you do this you will get timeouts of function (extra usage)

registerTgRoutes(bot, logger)

const generateWebhookUrl = () =>
  `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${FUNCTION_TARGET}`

if (NODE_ENV === "production") {
  bot.telegram.setWebhook(generateWebhookUrl)
  exports.botHook = (req, res) => {
    logger.info("request: ", req.body)
    bot.handleUpdate(req.body, res)
  }
} else {
  bot.launch()
  logger.info("launching application")
}
