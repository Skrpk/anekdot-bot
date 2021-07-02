const config = require("config")

const VKSource = require("api/services/data-sources/vk")

const mapping = {
  vk: () => new VKSource(config.get("sources.vk"))
}
const sources = {}
config.get("sources.activatedSources").map(sourceName => {
  sources[sourceName] = mapping[sourceName]()
})

module.exports = sources
