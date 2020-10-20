const Discord = require('discord.js');
var fs = require('fs');
const MAX_CARDS = 77;
const planos = require('../planes.json');

let picked = [];

module.exports.run = async (bot, message, args, cmd) => {
  if (args === 'reset') {
    message.channel.send('DECK RESETADO');
    resetCards();
    return;
  }

  if (picked.length === MAX_CARDS) resetCards();

  do {
    card = pickCard();
    console.log(card.name);
  } while (picked.includes(card.name));

  picked.push(card.name);
  console.log('Picked', picked);

  oracle = card.oracle_text.split('\n');

  let embed = new Discord.RichEmbed()
    .setTitle(card.name)
    .setAuthor(card.type_line)
    .setColor('#f44242')
    .setFooter(card.artist)
    .setImage(card.image_uris.large)
    .addField('Rarity', card.rarity);
  oracle.map((ele) => embed.addField('Effect', ele, true));

  message.channel.send({ embed });
};

function pickCard() {
  index = Math.floor(Math.random() * MAX_CARDS);
  let card = planos.data[index];

  return card;
}

function resetCards() {
  picked = [];
  console.log('RESET', picked);
}

module.exports.help = {
  name: 'plano',
};
