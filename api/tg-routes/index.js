const dailyAnekCommand = require("api/tg-routes/daily-anek-cmd")

const commands = [{ name: "daily_anek", command: dailyAnekCommand }]

module.exports = bot => {
  commands.forEach(({ name, command }) => bot.command(name, command))
}
