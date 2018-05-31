const Discord = require("discord.js");
const fortniteAPI = require('fortnite');
const fortnite = new fortniteAPI(process.env.FORTNITE_KEY);

module.exports.run = async (bot, message, args, cmd) => {
  fortnite.user(args, 'pc').then(data =>{
    let stats = data.stats;
    let lifetime = stats.lifetime;
    let user = data.username;
    let top3 = lifetime[2]['Top 3s'];
    let top5 = lifetime[1]['Top 5s'];
    let top12 = lifetime[4]['Top 12s'];
    let score = lifetime[6].Score;
    let matches = lifetime[7]['Matches Played'];
    let wins = lifetime[8].Wins;
    let winper = lifetime[9]['Win%'];
    let kills = lifetime[10].Kills;
    let kda = lifetime[11]['K/d'];

    let embed = new Discord.RichEmbed()
    .setTitle("Fortnite Stats")
    .setAuthor(data.username)
    .setColor("#f44242")
    .addField("Wins", wins, true)
    .addField("Win %", winper, true)
    .addField("K/D", kda, true)
    .addField("Partidas Jogadas", matches, true)
    .addField("Score", score, true)
    .addField("Kills", kills, true)
    .addField("Top 3", top3, true)
    .addField("Top 5", top5, true)
    .setFooter("Freon God, Artur ama piroca, SK contrata o Marquinhos, Vieira tmj, bj Kenji, Haycan usa crack", "https://images.discordapp.net/avatars/111900723268030464/3f21ab425d4afbfdf37d61db79e40947.png?size=1024")
    .addField("Top 12", top12, true);
    message.channel.send(embed);
    
    const lean = bot.emojis.find("name", "lean");
    message.react(lean.id);

    winper = winper.replace('%','');
    if (winper > 20) {
      message.channel.send(`**ESSE [ ${user} ] É UM MITO BRO**`);
    } else if (winper > 10) {
      message.channel.send(`**ESSE [ ${user} ] É MUITO GOD BRO**`);
    }
    else {
      message.channel.send(`**ESSE [ ${user} ] É UM LIXO BRO**`);
    }
    //console.log(Object.getOwnPropertyNames(lifetime[0]));

  }).catch(e =>{
    console.log(e);
    message.channel.send('Deu ruim bro 7 7 7 7');
  });
}

module.exports.help = {
  name: 'fortnite'
}
