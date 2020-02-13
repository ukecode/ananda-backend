const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');


// replace the value below with the Telegram token you receive from @BotFather
const token = "925792826:AAEyV1HL1xMtxehkGsZSd3qGsdY3G5ypmg8";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);

// --------  

if(msg.text  == 'Oi'){
    bot.sendMessage(chatId, 'Oiiii sumido, tudo bem?');

}

if(msg.text  == 'Tudo e vc?'){
    bot.sendMessage(chatId, 'Melhor agora ;)');

}
  // send a message to the chat acknowledging receipt of their message
});


cron.schedule('0 6-7 * * * ', () => {
    bot.sendMessage('823137937', 'Bom dia flor do dia!');
  });