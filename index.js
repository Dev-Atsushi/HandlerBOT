const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
    console.log('Bot Pingando!')
    response.send(200);
});
app.listen(process.env.PORT)
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.repl.co/`);
}, 280000); // código que deixa o bot online

const Discord = require("discord.js");
const db = require("quick.db")
const client = new Discord.Client();
const config = require("./config.json");
let fs = require("fs")
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir(`./commands/`, (err, files) => {
    if (err) console.error(err);

    let fileCommand = files.filter(fileCommand => fileCommand.split(".").pop() === "js");
    if (fileCommand.length <= 0) return;
    fileCommand.forEach((fileCommand, i) => {
        let props = require(`./commands/${fileCommand}`);
        console.log(props.info.name)
client.commands.set(props.info.name, props)
        if (!props.info.aliases) return;
        props.info.aliases.forEach(alias => {
            client.aliases.set(alias, props.info.name);
        });
    });
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if(!cmd) {
let embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('`\📛\` Comando Inválido')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Code© Todos os Direitos Reservados`, message.author.displayAvatarURL({ dynamic: true }))

        return message.channel.send(embed)
}

    cmd.run(client, message, args, db);
})

client.on("ready", () => {
  let activities = [
      `1`,
      `2`,
      `3`,
      `4`,
      `5`,
      `6`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 15000); //WATCHING, LISTENING, PLAYING, STREAMING 
console.log("Online Bot!")
});

client.login(process.env.TOKEN);
