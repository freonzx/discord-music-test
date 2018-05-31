const Discord = require("discord.js");
const steamUserInventory = require('steam-user-inventory');
const market = require('steam-market-pricing');
const currency = require('currency.js');

module.exports.run = async (bot, message, args, cmd) => {
  if (!args) {
    message.channel.send('Tá usando errado bro 7 7 7 7, preciso do ID ou username.');
    return;
  }
  const getInventory = async () => {
    const items = []
    var total = 0;
    var invent = args + ' Inventory\n```';

    const steamInventory = await steamUserInventory(args)
    if (steamInventory == 0) {
      message.channel.send('Não recebi nada bro, inventório deve ser privado.');
      return;
    }

    for (var i = 0; i < steamInventory.length; i++) {
      if (steamInventory[i].marketable && !steamInventory[i].name.includes('Case')) {
        const itemPrice = await market.getItemPrice(730, steamInventory[i].marketHashName)
        //items.push(`Hash: ${itemPrice.market_hash_name} Value: ${itemPrice.median_price}`)
        items.push({
          hash: itemPrice.market_hash_name,
          value: itemPrice.median_price
        })
      }
    }
    items.forEach((item) => {
      let valor = Number(item.value.replace('$', '')) * 3.40;

      if (invent.length >= 1950) { //to handle 2000 caracrters limit
        invent += '```';
        message.channel.send(invent);
        invent = '```';
      }

      invent += `${item.hash} Value: ${currency(valor).value} \n`;
      total += valor;
    });
    invent += 'Total: R$ ' + currency(total).value
    invent += '```'
    message.channel.bulkDelete(1)
    const lean = bot.emojis.find("name", "lean");
    message.react(lean.id);
    message.channel.send(invent)
    //return items
  }
  getInventory().catch(e => {
    console.error(e);
    message.channel.send('DEU MUITO RUIM MANO, FBI TÁ ATRÁS DA GENTE AGORA CARALHO \n( HTTPError: Response code 429 (Too Many Requests) )');
  });
  message.channel.send('Se eu não enviar nada é porque deu ruim, geralmente demoro 30 sec.')
}

module.exports.help = {
  name: "inv"
}
