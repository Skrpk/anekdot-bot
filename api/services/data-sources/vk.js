const { VK } = require("vk-io")
const logger = require("log")

class VKSource {
  constructor({ token, apiLimit, groupId }) {
    this.vk = new VK({ token: token, apiLimit: apiLimit })
    this.groupId = groupId
  }

  getDailyAnek = async () => {
    const resp = await this.vk.api.wall.get({
      owner_id: this.groupId,
      count: 100,
      filter: 'owner'
    })

    return resp.items[Math.floor(Math.random() * 100)].text
  }
}

module.exports = VKSource
