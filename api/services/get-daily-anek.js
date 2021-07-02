const { vk } = require("api/services/data-sources")

const getDailyAnek = async () => {
  return vk.getDailyAnek()
}

module.exports = {
  getDailyAnek
}
