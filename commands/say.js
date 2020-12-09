const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  const falar = args.join(" ")
    message.channel.send(falar)
}
module.exports.info = {
  name: "say",
}
