const config = require("config")
const logger = require("log")

const { getDailyAnek } = require("api/services/get-daily-anek")

module.exports = async ctx => {
  try {
    const reply = await getDailyAnek()
    ctx.reply(reply)
  } catch (err) {
    console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTT")
    logger.error({
      scope: "commands.get-daily-anek",
      errors: [err]
    })
    ctx.reply(config.get("FAILED_OPERATION_MESSAGE"))
  }
}
