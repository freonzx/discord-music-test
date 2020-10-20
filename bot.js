const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const embeds = require("./embeds.js");
client.commands = new Discord.Collection();

//const config = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));
fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split('.').pop() == 'js')
  if (jsfile.length <= 0){
    console.log("Didn't find commands to load.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`[+] Command ${f} loaded.`);

    if (Array.isArray(props.help.name)) {
      props.help.name.forEach( function(item){
        client.commands.set(item, props);
      })
    }else{
      client.commands.set(props.help.name, props);
    }
    //console.log(client.commands);
  });
});

//const bot_controller = "133504218391642113";
const prefix = ">";

client.login(process.env.BOT_TOKEN);

client.on('message', async message => {
  const member = message.member;
  const mess = message.content.toLowerCase();
  const msgcmd = message.content.split(' ')[0].slice(prefix.length);
  const args = message.content.split(' ').slice(1).join(" ");

  //Handling Private messages sent to the bot
  if (message.channel.type === 'dm') {
    if (message.author.equals(client.user)) return;
    else {
      message.reply('NÃO FALO EM PRIVADO BRO, VAI TOMAR NO CU ARTUR');
      return;
    }
  }

  //Logging
  let messTime = message.createdAt.toString().replace('2018','').replace('GMT-0300 (Hora oficial do Brasil)','');
  if (mess.startsWith(prefix)) console.log(`[*] ${messTime} ${message.author.username}: ${mess}`);
  //Command Handler
  if (mess.startsWith(prefix)) {
    let commandfile = client.commands.get(msgcmd);
    if (commandfile) commandfile.run(client, message, args, msgcmd);
  }
  //Handles unknown commands
  else if (mess.startsWith(prefix)) {
    if (message.author.equals(client.user)) return;
    message.reply("Ow chupa meu pal bro, todo mundo gosta de mim bro.");
  }
});

//On Ready
client.on('ready', function() {
  console.log("[*] Online.");
  client.user.setActivity('Skrrt skrrt skrrt skrrt', {
    type: 'LISTENING'
  });

  //setInterval(function(){ console.log(process.memoryUsage()); }, 600 * 1000);

  client.guilds.forEach((guild) => { //for each guild the bot is in
    let defaultChannel = "";
    guild.channels.forEach((channel) => {
      if (channel.type == "text" && defaultChannel == "") {
        if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
          defaultChannel = channel;
        }
      }
    })
    setInterval(function() {
        var textArray = [
          embeds.data.fazSol,
          embeds.data.doubleCup,
          "SKRRRRT SKRRRT SKRRRRRT <:swag:449814696544043009>",
          embeds.data.todoMundo,
          embeds.data.ferClothing,
          embeds.data.kurtCobain,
          "JOGUEI CODEINA NA MINHA FANTA <:swag:449814696544043009> <:lean:449823963762393089>",
          "ELES ACHAM MINHA CALÇA APERTADA STYLE ELES SABEM SOU GANGSTA PARADISE <:swag:449814696544043009>",
          "AY, AY, AY, AY, AY AY, AY, AY, AY, AY AY, AY, AY, AY, AY",
          "AY AY AY SK CONTRATA O MARQUINHOS BRO"
        ];

        var randomN = Math.floor(Math.random() * textArray.length);
        defaultChannel.send(textArray[randomN]) //send it to whatever channel the bot has permissions to send on
      },
      900 * 1000);
  })
});
