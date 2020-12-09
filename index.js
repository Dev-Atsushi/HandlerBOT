const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.js");
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
    if(message.author.bot) return;
    if(!message.content.toLowerCase().startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if(!cmd)

    cmd.run(client, message, args);
})

client.on("ready", () => {
console.log("Bot Online!")
});

client.login(config.token);
