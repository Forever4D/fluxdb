const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class GnomeCommand extends BaseCommand {
  constructor() {
    super('reload', 'misc', [], 'reload bot');
  }

  
  
  run(client, message, args) {
    if (message.author.id == "239023934391975936") 
    
    {
      
      const timeoutP = time => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    };
      
      message.channel.send(`Rebooting system... <a:error:${'717339427709648977'}>`).then((msg)=>{
      timeoutP(2000);
      msg.edit("System restarted! "+`<a:error:${'717352512239435776'}>`).then(()=> {process.exit(1);})
      
      
})
    
  };
 }
}