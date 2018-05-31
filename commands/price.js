const Discord = require("discord.js");
const market = require('steam-market-pricing');
const currency = require('currency.js');

const real = 3.40;

module.exports.run = async (bot, message, args, cmd) => {
    if (!args) {
      message.channel.send('>price nome_do_item bro');
      return;
    }
    market.getItemPrice(730, args).then(item =>{
      let lowreal = Number(item.lowest_price.replace('$','')) * real
      let avereal = Number(item.median_price.replace('$','')) * real
      let embed = new Discord.RichEmbed()
      .setTitle("Steam Price")
      .setAuthor(bot.user.username)
      .setColor("#f44242")
      .addField("Item", item.market_hash_name , true)
      .addField("Lowest Price", 'R$ ' + currency(lowreal) , true)
      .addField("Average Price", 'R$ ' + currency(avereal) , true)
      .setFooter("Freon God, Artur ama piroca, SK contrata o Marquinhos, Vieira tmj, bj Kenji, Haycan usa crack", "https://images.discordapp.net/avatars/111900723268030464/3f21ab425d4afbfdf37d61db79e40947.png?size=1024")
      .addField("Volume", item.volume , true);
      message.channel.send(embed);
    }).catch(e =>{
      message.channel.send('Um erro ocorreu, talvez o nome do item esteja errado bro.');
    });
}

module.exports.help = {
  name: "price"
}
