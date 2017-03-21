const express = require('express');
const bodyParser = require("body-parser");
const https = require("https");
const DotaBot = require('./dotaBot');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const botKey = process.env.BOT_KEY || '';
const webhookUrl = process.env.WEBHOOK_URL ? `${process.env.WEBHOOK_URL}${process.env.BOT_KEY}` : '';
const dotaBot = new DotaBot(botKey);

if (webhookUrl) {
  dotaBot.setWebhook(webhookUrl).then(() => {
    console.log('ok');
  }, () => {
    dotaBot.startLongPolling();
  });
} else {
  dotaBot.startLongPolling();
}

// wake up heroku bot
setInterval(function() {
    https.get("https://dotabot.herokuapp.com/");
}, 300000); // every 5 minutes (300000)


app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send(`it's alive`);
});

// forwebhook
app.post(`/${botKey}`, (req, res) => {
  console.log(req.body);
  dotaBot.handleUpdates(req.body);
  res.send(`ok`);
});

app.listen(app.get('port'), function() {
  console.log('App runing on port ', app.get('port'));
});
