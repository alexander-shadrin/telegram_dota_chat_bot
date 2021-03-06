const HTTP = require('./https');

class Bot {
  constructor(key){
    this.telegramUrl = 'api.telegram.org';
    this.key = key;
    
  }

  handleUpdates(update) {
    // do nothing
  }

  startLongPolling() {
    let updateId = 0;
    setInterval( () => {
      this.getUpdates(updateId).then((updates) => {
        JSON.parse(updates).result.map( update => {
          updateId = update.update_id >= updateId ? update.update_id + 1 : updateId;
          this.handleUpdates(update);
        });
      });
    }, 1000);
  }

  setWebhook(url){
    const webhookParams = JSON.stringify({ url: url });
    const method = 'setWebhook';
    const options = {
      hostname: `${this.telegramUrl}`,
      port: 443,
      path: `/bot${this.key}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(webhookParams),
      }
    };
    return HTTP.httpsPost(options, webhookParams);
  }

  deleteWebhook(){
    const method = 'deleteWebhook';
    const options = {
      hostname: `${this.telegramUrl}`,
      port: 443,
      path: `/bot${this.key}/${method}`,
      method: 'GET'
    };
    return HTTP.httpsGet(options);
  }

  getUpdates(updateId){
    const method = 'getUpdates';
    const options = {
      hostname: `${this.telegramUrl}`,
      port: 443,
      path: `/bot${this.key}/${method}?offset=${updateId}`,
      method: 'GET'
    };
    return HTTP.httpsGet(options);
  }

  getMe() {
    const method = 'getMe';
    const options = {
      hostname: `${this.telegramUrl}`,
      port: 443,
      path: `/bot${this.key}/${method}`,
      method: 'GET'
    };
    return HTTP.httpsGet(options);
  }

  sendMessage(msg) {
    const message = JSON.stringify(msg);
    const method = 'sendMessage';
    const options = {
      hostname: `${this.telegramUrl}`,
      port: 443,
      path: `/bot${this.key}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(message),
      }
    };
    return HTTP.httpsPost(options, message);
  }
}

module.exports = Bot;