const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

var guilds = {};

module.exports.run = async (bot, message, args, cmd) => {
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

  switch (cmd) {
    case 'play':
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
              console.log('[*] We playing ' + videoInfo.title);
            });
          });
        }
      } else {
        message.reply(" you need to be in a voice channel!");
      }
      break;

      case 'skip':
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
        break;

        case 'queue':
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
          break;

        case 'leave':
        guilds[message.guild.id].queue = [];
        guilds[message.guild.id].queueNames = [];
        guilds[message.guild.id].isPlaying = false;
        guilds[message.guild.id].voiceChannel.leave();
          break;
    default:

  }
}

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
        //console.log(Object.getOwnPropertyNames(guilds[message.guild.id]));
        guilds[message.guild.id].queue = [];
        guilds[message.guild.id].queueNames = [];
        guilds[message.guild.id].isPlaying = false;
        guilds[message.guild.id].voiceChannel.leave();
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

module.exports.help = {
  name: ['play', 'skip', 'leave', 'queue']
}
