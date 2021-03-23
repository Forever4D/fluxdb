const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");
const { cyan } = require("../../../colours.json");

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('ahelp', 'misc', ['h', 'commands'], 'ahelp');
  }

  run(client, message, args) {
    //create an embed
    const help = new MessageEmbed()
      .setColor(cyan)
      .setTitle('Help')
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

    //check if there is an argument
    if(!args[0]){
      help.setDescription(`Avaliable commands for ${message.guild.me.displayName}\nPrefix: **${client.prefix}**`);
      help.addField(`**Misc [19]:**`, '8ball, help, meme, ping, poll, roll, serverinfo, uptime, urban, userinfo');
      help.addField(`**Mod [6]:**`, 'ban, clear, kick, mute, say, unmute');
      help.addField(`**Music [8]:**`, 'leave, loop, nowplaying, pause, play, queue, remove, skip');

      return message.channel.send(help);
    } else{
      //get the command based off of the name entered or the alias entered
      let command = client.commands.get(args[0].toLowerCase());
    
      //if the command doesn't exist send a message to the channel
      if(!command){
        return message.channel.send(help.setTitle("Invalid command.").setDescription(`Use \`${client.prefix}help\` for a list of commands!`));
      }

      //set description of the embed
      help.setDescription(stripIndents`The prefix is: \`${client.prefix}\`\n
        **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
        **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}
        **Usage:** ${command.usage ? `\`${command.usage}\`` : "No usage"}`);

      return message.channel.send(help);
    }
  }
}