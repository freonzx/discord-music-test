const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

//var config = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));

const bot_controller = "133504218391642113";
const prefix = ">";

var guilds = {};


client.login(process.env.BOT_TOKEN);

client.on('message', function(message) {
  const member = message.member;
  const mess = message.content.toLowerCase();
  const args = message.content.split(' ').slice(1).join(" ");

  if (message.channel.type === 'dm'){
    if (message.author.equals(client.user)) return;
    else{
    message.reply('NÃO FALO EM PRIVADO BRO, VAI TOMAR NO CU ARTUR');
    return
    }
  }

  if (!guilds[message.guild.id]) {
    guilds[message.guild.id] = {
      queue: [],
      queueNames: [],
      isPlaying: false,
      dispatcher: null,
      voiceChannel: null,
      skipReq: 0,
      skippers: []
    };
  }

  if (mess.startsWith(prefix + "play")) {
    if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
      if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
        getID(args, function(id) {
          add_to_queue(id, message);
          fetchVideoInfo(id, function(err, videoInfo) {
            if (err) throw new Error(err);
            message.reply(" added to queue: **" + videoInfo.title + "**");
            guilds[message.guild.id].queueNames.push(videoInfo.title);
          });
        });
      } else {
        isPlaying = true;
        getID(args, function(id) {
          guilds[message.guild.id].queue.push(id);
          playMusic(id, message);
          fetchVideoInfo(id, function(err, videoInfo) {
            if (err) throw new Error(err);
            guilds[message.guild.id].queueNames.push(videoInfo.title);
            message.reply(" now playing: **" + videoInfo.title + "**");
          });
        });
      }
    } else {
      message.reply(" you need to be in a voice channel!");
    }
  } else if (mess.startsWith(prefix + "skip")) {
    if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
      guilds[message.guild.id].skippers.push(message.author.id);
      guilds[message.guild.id].skipReq++;
      if (guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
        skip_song(message);
        message.reply(" your skip has been acknowledged. Skipping now!");
      } else {
        message.reply(" your skip has been acknowledged. You need **" + Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipReq) = "**  more skip votes!";
      }
    } else {
      message.reply(" you already voted to skip!");
    }
  } else if (mess.startsWith(prefix + "queue")) {
    var message2 = "```";
    for (var i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
      var temp = (i + 1) + ": " + guilds[message.guild.id].queueNames[i] + (i === 0 ? "**(Current Song)**" : "") + "\n";
      if ((message2 + temp).length <= 2000 - 3) {
        message2 += temp;
      } else {
        message2 += "```";
        message.channel.send(message2);
        message2 = "```";
      }
    }
    message2 += "```";
    message.channel.send(message2);
  } else if (mess.startsWith(prefix + "leave")) {
    // TODO
  } else if (mess.startsWith(prefix + "bro")) {
    message.reply(" você é branco brooo não fala comigo.");
  } else if (mess.startsWith(prefix + "777")) {
    message.reply(" 7 7 7 7 AYYY AYY AY AYYYYY.");
  } else if (mess.startsWith(prefix + "maconha")) {
    message.reply(" Eu tenho maconha bro.");
  } else if (mess.startsWith(prefix + "lean")) {
    message.reply(" https://i.ytimg.com/vi/GHmFaX75zPo/maxresdefault.jpg <:lean:449823963762393089>DOUBLE CUP SPRITE CODEIN BROOOOOOOOO AYYYY AY AYYYYYYYYYY.<:lean:449823963762393089>");
  } else if (mess.startsWith(prefix + "hater")) {
    message.reply("https://i0.wp.com/corrupcaobrnews.org/wp-content/uploads/2018/05/oculos-raffa-moreira-hype-branco-oval-supreme-bape-palace-D_NQ_NP_762019-MLB26777471409_022018-F.jpg?fit=758%2C424\nEU SOQUEI UM HATER NO SHOPPING QUE FALOU BOSTA");
  } else if (mess.startsWith(prefix + "swag")) {
    message.reply(" Você não tem swag bro skrrr <:swag:449814696544043009>");
  } else if (mess.startsWith(prefix + "marquinho")) {
    message.reply(" Marquinhos é god bro <:lean:449823963762393089>");
  } else if (mess.startsWith(prefix + "vieira")) {
    message.reply(" CABEÇA DE LAMPADA BRO AYY AYY AYY AYY");
  } else if (mess.startsWith(prefix + "choice")) {
    message.reply("CHOICE você é feio bro, outra cena, outra vivencia, outro tudo Eeeei mlk branco, você sabe que ñ aguenta cmg bro");
  } else if (mess.startsWith(prefix + "pineaple")) {
    message.reply(" PAGA O QUE ME DEVE PINEAPLE BRO");
  }
  //COMMANDS
  else if (mess.startsWith(prefix + "comandos")) {
    message.reply("Tá aqui minha lista de comandos bro ```\n#bro\n#777\n#maconha\n#lean\n#hater\n#swag\n#marquinho\n#comandos\n#vieira\n#choice\n#pineaple```");
  }


  else if (mess.startsWith(prefix)) {
    if (message.author.equals(client.user)) return;
    message.reply("Ow chupa meu pal bro, todo mundo gosta de mim bro.");
  }
});


client.on('ready', function() {
  console.log("I am ready!");
  client.user.setActivity('Skrrt skrrt skrrt skrrt', {
    type: 'LISTENING'
  });

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
        'http://images.virgula.com.br/2018/01/IMG-20171129-WA0002-855x569.jpg\nBROOOOOOOOOOOOOOOOOOOOOOOO FAZ SOOOOOOOOOOOOOOOOOOL.',
        'https://3.bp.blogspot.com/-5zP2-ZilzbQ/WmqoZDwgKLI/AAAAAAAAeo0/A5uFaDoon0MyFBEy_k4xid2cPAPN04VnwCLcBGAs/s1600/mrmrmrdd.png\nDOUBLE CUP SPRITE CODEIN AY AY AY. <:lean:449823963762393089>',
        "SKRRRRT SKRRRT SKRRRRRT <:swag:449814696544043009>",
        "https://video-images.vice.com/articles/59f88fa059200c2c307c9140/lede/1509462376008-raffa.jpeg\nTODO MUNDO FALA DE MIM, RAFFA MOREIRA MANO.",
        "FERNVNDX CLOTHING NEGOOOOOOOO AY AY AY",
        "https://pbs.twimg.com/profile_images/968467150309675009/gvhc0jw9_400x400.jpg\nWOW, ÓCULOS DO KURT COBAIN",
        "JOGUEI CODEINA NA MINHA FANTA <:swag:449814696544043009> <:lean:449823963762393089>",
        "ELES ACHAM MINHA CALÇA APERTADA STYLE ELES SABEM SOU GANGSTA PARADISE <:swag:449814696544043009>",
        "AY, AY, AY, AY, AY AY, AY, AY, AY, AY AY, AY, AY, AY, AY",
        "AY AY AY SK CONTRATA O MARQUINHOS BRO"
      ];
      var randomN = Math.floor(Math.random()*textArray.length);
      defaultChannel.send(textArray[randomN]) //send it to whatever channel the bot has permissions to send on
    }, 30 * 1000);
  })
});

function skip_song(message) {
  guilds[message.guild.id].dispatcher.end();
}

function playMusic(id, message) {
  guilds[message.guild.id].voiceChannel = message.member.voiceChannel;



  guilds[message.guild.id].voiceChannel.join().then(function(connection) {
    stream = ytdl("https://www.youtube.com/watch?v=" + id, {
      filter: 'audioonly'
    });
    guilds[message.guild.id].skispReq = 0;
    guilds[message.guild.id].skippers = [];

    guilds[message.guild.id].dispatcher = connection.playStream(stream);
    guilds[message.guild.id].dispatcher.on('end', function() {
      guilds[message.guild.id].skipReq = 0;
      guilds[message.guild.id].skippers = [];
      guilds[message.guild.id].queue.shift();
      guilds[message.guild.id].queueNames.shift();
      if (guilds[message.guild.id].queue.length === 0) {
        guilds[message.guild.id].queue = [];
        guilds[message.guild.id].queueNames = [];
        guilds[message.guild.id].isPlaying = false;
        guilds[message.guild.id].connection.disconnect();
      } else {
        setTimeout(function() {
          playMusic(guilds[message.guild.id].queue[0], message);
        }, 500);
      }
    });
  });
}

function getID(str, cb) {
  if (isYoutube(str)) {
    cb(getYouTubeID(str));
  } else {
    search_video(str, function(id) {
      cb(id);
    });
  }
}

function add_to_queue(strID, message) {
  if (isYoutube(strID)) {
    guilds[message.guild.id].queue.push(getYouTubeID(strID));
  } else {
    guilds[message.guild.id].queue.push(strID);
  }
}

function search_video(query, callback) {
  request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + process.env.API_KEY, function(error, response, body) {
    var json = JSON.parse(body);
    if (!json.items[0]) callback("3_-a9nVZYjk");
    else {
      callback(json.items[0].id.videoId);
    }
  });
}

function isYoutube(str) {
  return str.toLowerCase().indexOf("youtube.com") > -1;
}
