const Discord = require("discord.js")
module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  const embed = new Discord.MessageEmbed()
    .setColor("BLACK") // Cor de sua preferência
    .setTitle("Baixe [Aqui]("+user.displayAvatarURL()+") o Avatar de "+user.username+"")
    .setImage(user.displayAvatarURL({ size: 512, dynamic: true }).replace(".webp", ".png"))
  message.channel.send(embed)

}
module.exports.info = {
  name: "avatar"
}
