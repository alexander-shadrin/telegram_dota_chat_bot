const BotEngine = require('./botEngine');

class DotaBot extends BotEngine {
  constructor(key){
    super(key);
  }

  handleUpdates(update) {
    const msgText = update.message.text;
    const chatId = update.message.chat.id;
    if (update.message.text) {
      if (msgText[0] === '/') {
        this.executeCommand(chatId, msgText);
      } else {
        msgText.split(' ').map( x=> {
          if ( x.toLowerCase().substring(0, 3) === 'дот' || x.toLowerCase() === 'dota' ) {
            this.sendMessage({
              chat_id: chatId,
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

  executeCommand(chatId, cmdText) {
    let commandParams = cmdText.split(' ');
    const commandType = commandParams.shift().substr(1);
    if (this[commandType]) {
      const responce = this[commandType](commandParams);
      this.sendMessage({
        chat_id: chatId,
        parse_mode: responce.parse_mode || 'HTML',
        text: responce.text,
      });
    }
  }

  echo(params) {
    return { text: params.join(' ') };
  }
}

module.exports = DotaBot;
