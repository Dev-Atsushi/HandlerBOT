const Discord = require("discord.js")
module.exports.run = async (client, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setColor("BLACK") // Cor de sua preferência
    .setTitle("Baixe [Aqui]("+message.guild.iconURL()+") o Icon de "+message.guild.name+"")
    .setImage(message.guild.iconURL({ dynamic: true }).replace(".webp", ".png"))
  message.chnel.send(embed)

}
module.exports.info = {
  name: "servericon"
}
