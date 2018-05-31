const Discord = require("discord.js");
const password = require('password');

module.exports.run = async (bot, message, args, cmd) => {
    if (!args) {
      message.reply('Usage: >password number');
      return;
    }
    let newpass = password(args)
    message.reply(`Sua nova senha agora é: ${newpass} bro`);
}

module.exports.help = {
  name: ['password','pass']
}
