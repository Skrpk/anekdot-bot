const config = require("config")
require("dotenv").config()

module.exports = {
  botConfig: {
    BOT_TOKEN: process.env.BOT_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    PROJECT_ID: process.env.PROJECT_ID,
    REGION: process.env.REGION,
    FUNCTION_TARGET: process.env.FUNCTION_TARGET
  },
  sources: {
    vk: {
      token: process.env.VK_API_TOKEN,
      apiLimit: 20,
      groupId: "-85443458"
    },
    activatedSources: ["vk"]
  },
	FAILED_OPERATION_MESSAGE: "I'm fucking sorry, bro, but I can't!"
}
