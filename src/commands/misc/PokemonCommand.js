const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js")
const { inspect } = require('util');

module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super('eval', 'misc', ['ev'], 'eval');
  }

  async run(client, message, args) {
    
    if (message.author.id !== "239023934391975936") {
            return message.reply("Bot owner only! :x:")
    }
    
    if (message.author.id == "239023934391975936") {
      
    let evaled;
    try {
      evaled = await eval(args.join(' '));
      message.channel.send(inspect(evaled));
      console.log(inspect(evaled));
    }
    catch (error) {
      console.error(error);
      message.reply('there was an error during evaluation.');
    }
      
      
  };
    //else
    
  }
}