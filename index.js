const express = require('express');
const app = express();
const DotaBot = require('./dotaBot');
const botKey = process.env.BOT_KEY || '';

const dotaBot = new DotaBot(botKey);

app.set('port', (process.env.PORT || 5000));

// forwebhook
app.post(`/${botKey}`, (req, res) => {
  res.send('testbot');
});

app.listen(app.get('port'), function() {
  console.log('App runing on port ', app.get('port'));
});
