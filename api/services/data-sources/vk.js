const { VK } = require("vk-io")
const logger = require("log")

class VKSource {
  constructor({ token, apiLimit, groupId }) {
    this.vk = new VK({ token: token, apiLimit: apiLimit })
    this.groupId = groupId
    this.linkRegExp = "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
  }

  getDailyAnek = async () => {
    const resp = await this.vk.api.wall.get({
      owner_id: this.groupId,
      count: 100,
      filter: 'owner'
    })

    return this.getAnekFromResp(resp.items)
  }

  getAnekFromResp = (items) => {
    let index = Math.floor(Math.random() * 100)
    let anek = items[index].text

    while(this.checkIfAnekIsCommercial(anek)) {
			index = Math.floor(Math.random() * 100)
			anek = items[index].text
    }

    return anek
  }

	checkIfAnekIsCommercial = (anek) => new RegExp(this.linkRegExp).test(anek)
}

module.exports = VKSource
