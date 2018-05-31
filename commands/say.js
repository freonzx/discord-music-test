const Discord = require("discord.js");

module.exports.run = async (bot, message, args, cmd) => {
    if (!args) {
      message.channel.send('Tá usando errado bro 7 7 7 7');
      return;
    }
    message.delete();
    message.channel.send(args);
}

module.exports.help = {
  name: "say"
}
