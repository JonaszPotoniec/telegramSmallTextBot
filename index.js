const config = require('./config.json');
const map = require('./map.json');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(config.token, {polling: true});

const swapFunction = config.remove_unknown ? (c) => {return map[c]} : (c) => {let newLetter = map[c]; return newLetter === undefined ? c : map[c]};

bot.on('message', (msg) => {
    bot.sendMessage(
        msg.chat.id, (msg.text.split("").map(swapFunction)).join("")
    );
});

bot.on('polling_error', (error) => {
    console.log(Date(), error);
});

