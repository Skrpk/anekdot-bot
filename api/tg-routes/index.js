const dailyAnekCommand = require("api/tg-routes/daily-anek-cmd")

const commands = [
  { command: "/daily_anek", func: dailyAnekCommand, description: "Анекдот" }
]

module.exports = bot => {
  commands.forEach(({ func, command }) =>
    bot.command(command.split("/")[1], func)
  )
  bot.telegram.setMyCommands(commands)
}
