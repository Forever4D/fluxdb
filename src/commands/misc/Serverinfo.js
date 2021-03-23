const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { blue_dark } = require("../../../colours.json");
const { stripIndent } = require("common-tags");
const moment = require("moment");

module.exports = class CreatorCommand extends BaseCommand {
  constructor() {
    super('serverinfo', 'misc', ['si'], 'serverinfo');
  }

  run(client, message, args) {
    
    if (!message.guild) {
      return message.reply("This command is executeable only in servers!");
    }
    
    var Myguild = message.guild;

    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }

    function CheckJoin() {
      let now = new Date();
      let diff = now.getTime() - message.member.joinedTimestamp;
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }

    const timeoutP = time => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    };

    let region = {
      brazil: ":flag_br: Brazil",
      "eu-central": ":flag_eu: Central Europe",
      singapore: ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      sydney: ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      london: ":flag_gb: London",
      amsterdam: ":flag_nl: Amsterdam",
      hongkong: ":flag_hk: Hong Kong",
      russia: ":flag_ru: Russia",
      southafrica: ":flag_za:  South Africa"
    };

    let verifLevels = ["None", "Low", "Medium", "High", "Highest"];
    
     const user = Myguild.ownerID;
    //ServerInfo //**Owner Name: **${Myguild.name}
    const embedA = new MessageEmbed()
      .setThumbnail(message.guild.iconURL())
      .setAuthor(Myguild.name, message.guild.iconURL())
      .addField(
        "❯ Server",
        stripIndent`
      **ID: **${Myguild.id}
      **Owner: **<@${user}>
      **Region: **${region[message.guild.region]}
      **Verification Level: **${message.guild.verificationLevel}
  `,
        true
      )

      .addField(
        "❯ Members",
        stripIndent`
      **Total Members: **${Myguild.memberCount}
      **Humans: **${message.guild.members.cache.filter(x => !x.user.bot).size}
      **Bots: **${message.guild.members.cache.filter(x => x.user.bot).size}
      <:online:${"717427394100854835"}> **Online: **${
          message.guild.members.cache.filter(
            x => x.user.presence.status === "online"
          ).size
        }
      <:idle:${"717427431144947773"}> **Idle: **${
          message.guild.members.cache.filter(x => x.user.presence.status === "idle")
            .size
        }
      <:idle:${"717427455089967196"}> **Do Not Disturb: **${
          message.guild.members.cache.filter(x => x.user.presence.status === "dnd")
            .size
        }
      <:idle:${"717427478406234113"}> **Invisible: **${
          message.guild.members.cache.filter(
            x => x.user.presence.status === "offline"
          ).size
        }
  `,
        true
      )

      .addField(
        "❯ Channels",
        stripIndent`
       **Total: ** ${message.guild.channels.cache.filter(
         chan => chan.type === "voice"
       ).size +
         message.guild.channels.cache.filter(chan => chan.type === "text").size}
       **<:category:${"717653403236302858"}> Category: **${
          message.guild.channels.cache.filter(chan => chan.type === "category").size
        } 
       **<:text:${"717653456243916839"}> Text: **${
          message.guild.channels.cache.filter(chan => chan.type === "text").size
        } 
       **<:voice:${"717653477127356487"}> Voice: **${
          message.guild.channels.cache.filter(chan => chan.type === "voice").size
        } 
       **<:news:${"717653522581291018"}> News: **${
          message.guild.channels.cache.filter(chan => chan.type === "news").size
        } 
  `,
        true
      )

      .addField(
        "❯ Emoji [" + message.guild.emojis.cache.size + "]",
        stripIndent`
      **<:blobcoffie:${"717679009764343919"}> Regular: **${
          message.guild.emojis.cache.filter(x => !x.animated).size
        }
      **<a:anim:${"717349576134099027"}> Animated: **${
          message.guild.emojis.cache.filter(x => x.animated).size
        }
  `,
        true
      )

      .addField(
        "❯ Boosts",
        stripIndent`
      **<:level:${"717687248623108116"}> Level: ** ${message.guild.premiumTier.toString()}/3
      **<:boostcount:${"717687197289021461"}> Boost: ** ${message.guild.premiumSubscriptionCount.toString()}
  `,
        true
      )

      .addField(
        "❯ Misc",
        stripIndent`
      **Roles** [${message.guild.emojis.cache.size}]
      **<:hammer:${"717699065831489628"}> Bans:** ${ message.guild
          .fetchBans()
          .then(collec => `${collec.size}`)}
`,
        true
      )

      .addField(
        "❯ Server Creation Date:",
        stripIndent`
      **${moment
        .utc(message.guild.createdTimestamp)
        .format("DD MMM YYYY")}** (${checkDays(message.guild.createdAt)})
  `
      )

      .addField(
        "❯ You Joined at:",
        stripIndent`
  **${moment
    .utc(message.member.joinedTimestamp)
    .format("DD MMM YYYY")}** (${CheckJoin()})` + "\n",
        true
      );

    message.channel.send(embedA);
    
  }
}