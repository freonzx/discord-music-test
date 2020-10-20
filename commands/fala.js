const Discord = require("discord.js");

module.exports.run = async (bot, message, args, cmd) => {
  switch (cmd) {
    case 'swag':
      message.reply(" Você não tem swag bro skrrr <:swag:449814696544043009>");
      break;
    case 'marquinho':
      message.reply(" Marquinhos é god bro <:lean:449823963762393089>");
      break;
    case 'vieira':
      message.reply(" CABEÇA DE LAMPADA BRO AYY AYY AYY AYY");
      break;
    case 'choice':
      message.reply("CHOICE você é feio bro, outra cena, outra vivencia, outro tudo Eeeei mlk branco, você sabe que ñ aguenta cmg bro");
      break;
    case 'pineaple':
      message.reply(" PAGA O QUE ME DEVE PINEAPLE BRO");
      break;
    case 'codeina':
      message.channel.send({
        embed: {
          color: 3447003,
          image: {
            url: "https://1.bp.blogspot.com/-6ckvXUBJvSw/Wgzl_rI7d0I/AAAAAAAAZKU/1-lBC5h4OEE0ahHtpZrXoKTbM2fJ0uPigCLcBGAs/s1600/nakd.png"
          },
          description: "<:lean:449823963762393089> ❤ CODEINA BRO ❤ <:lean:449823963762393089>"
        }
      });
      break;
    case 'hater':
      message.channel.send({
        embed: {
          color: 3447003,
          image: {
            url: "https://i0.wp.com/corrupcaobrnews.org/wp-content/uploads/2018/05/oculos-raffa-moreira-hype-branco-oval-supreme-bape-palace-D_NQ_NP_762019-MLB26777471409_022018-F.jpg"
          },
          description: "EU SOQUEI UM HATER NO SHOPPING QUE FALOU BOSTA"
        }
      });
      break;
    case 'lean':
      message.channel.send({
        embed: {
          color: 3447003,
          image: {
            url: "https://i.ytimg.com/vi/GHmFaX75zPo/maxresdefault.jpg"
          },
          description: "<:lean:449823963762393089>DOUBLE CUP SPRITE CODEIN BROOOOOOOOO AYYYY AY AYYYYYYYYYY.<:lean:449823963762393089>"
        }
      });
      break;
    case 'maconha':
      message.channel.send({
        embed: {
          color: 3447003,
          image: {
            url: "https://scontent.fcgh11-1.fna.fbcdn.net/v/t31.0-8/27355688_152186868911512_3767623590325234762_o.jpg?_nc_cat=0&oh=79e98e3aa8d167e6cbc60606234d4f2f&oe=5B836C1B"
          },
          description: message.author + " EU TENHO MACONHA BRO"
        }
      });
      break;
    case '777':
      message.reply(" 7 7 7 7 AYYY AYY AY AYYYYY.");
      break;
    case 'bro':
      message.reply(" você é branco brooo não fala comigo.");
      break;
    case 'artur':
      message.channel.send({
        embed: {
          color: 317144,
          image: {
            url: "http://pm1.narvii.com/6833/9ccf3958e8a1d7bbd992c8f5146fe29be4cc7d30v2_00.jpg"
          },
          description: "TENTA ME BUGAR AGORA AI BRO, VOCÊ É BOBÃO BRO"
        }
      });
      break;
    case 'global':
      message.channel.send({
        embed: {
          color: 16777215,
          image: {
            url: "https://i.imgur.com/VFAbufH.png"
          },
          description: "Não vai mesmo bro."
        }
      });
      break;
    default:
  }
}

module.exports.help = {
  name: ['swag',
    'marquinho',
    'vieira',
    'choice',
    'pineaple',
    'artur',
    'codeina',
    'bro',
    '777',
    'maconha',
    'lean',
    'hater',
    'global'
  ]
}
