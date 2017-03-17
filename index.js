const express = require('express');
const https = require("https");
const DotaBot = require('./dotaBot');

const app = express();
const botKey = process.env.BOT_KEY || '';
const dotaBot = new DotaBot(botKey);

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
  res.send('testbot');
});

app.listen(app.get('port'), function() {
  console.log('App runing on port ', app.get('port'));
});
