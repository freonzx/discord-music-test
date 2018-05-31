const Discord = require("discord.js");
const steamUserInventory = require('steam-user-inventory');

module.exports.run = async (bot, message, args, cmd) => {
    if (!args) {
      message.channel.send('Tá usando errado bro 7 7 7 7');
      return;
    }
    let invbuffer = '```';

    const getInventory = async () =>{
      const steamInventory = await steamUserInventory(args)
      if (steamInventory == 0) {
        message.channel.send('Não recebi nada bro, inventório deve ser privado.');
        return;
      }

      for (var i = 0; i < steamInventory.length; i++) {
        if (invbuffer.length >= 1950) { //to handle 2000 caracrters limit
          invbuffer += '```';
          message.channel.send(invbuffer);
          invbuffer = '```';
        }
        if (steamInventory[i].marketable && !steamInventory[i].name.includes('Case')) {
          invbuffer += steamInventory[i].marketHashName.toString() + '\n';
        }
      }
      invbuffer += '```';
      const lean = bot.emojis.find("name", "lean");
      message.react(lean.id);
      message.channel.send(invbuffer);
    }
    getInventory();
}

module.exports.help = {
  name: "lista"
}
