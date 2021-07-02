const config = require("config")
const logger = require("log")

const { getDailyAnek } = require("api/services/get-daily-anek")

module.exports = async ctx => {
  try {
    logger.info({
      scope: "commands.get-daily-anek",
      message: "fetching daily anek"
    })
    const reply = await getDailyAnek()
    ctx.reply(reply)
  } catch (err) {
    logger.error({
      scope: "commands.get-daily-anek",
      errors: [err]
    })
    ctx.reply(config.get("FAILED_OPERATION_MESSAGE"))
  }
}
