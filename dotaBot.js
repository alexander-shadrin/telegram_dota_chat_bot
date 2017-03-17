const BotEngine = require('./botEngine');

class DotaBot extends BotEngine {
  constructor(key){
    super(key);
  }

  handleUpdates(update) {
    const msgText = update.message.text;
    if (update.message.text) {
      msgText.split(' ').map( x=> {
        if ( x.toLowerCase().substring(0, x.length -1) === 'дот' || x.toLowerCase() === 'dota' ) {
          this.sendMessage({
            chat_id: update.message.chat.id,
            parse_mode: 'HTML',
            text: ` 
            <b>DOTA ALERT</b>
            `,
          });
        }
      })
    }
  }
}

module.exports = DotaBot;
