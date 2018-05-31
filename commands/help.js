const Discord = require("discord.js");

module.exports.run = async (bot, message, args, cmd) => {
  let embed = new Discord.RichEmbed()
  .setTitle("Comandos")
  .setAuthor("RAFFA MOREIRA MANO")
  .setColor("#f44242")
  .setDescription("Lista de comandos bro:")
  .setThumbnail("http://i.imgur.com/p2qNFag.png")
  .addField("Comandos Normais", ">bro\n>777\n>maconha\n>lean\n>hater\n>swag\n>marquinho\n>comandos\n>vieira\n>artur\n>choice\n>pineaple\n>codeina\n>password 0-32\n**>say**\n>inv\n>price", true)
  .addField(">play", "Toca musica caralhoooooo skrrr skrr skrrr", true)
  .addField(">fortnite NOME", "Mostra os stats do bro", true)
  .addBlankField(true)
  .setFooter("Freon God, Artur ama piroca, SK contrata o Marquinhos, Vieira tmj, bj Kenji, Haycan usa crack", "https://images.discordapp.net/avatars/111900723268030464/3f21ab425d4afbfdf37d61db79e40947.png?size=1024");
  message.channel.send({embed});
}

module.exports.help = {
  name: "comandos"
}
