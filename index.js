//telegram node api fix
process.env.NTBA_FIX_319 = 1;

//config and bot api import
const config = require('./config.json');
const map = require('./map.json');
const TelegramBot = require('node-telegram-bot-api');

//statistics init
const fs = require('fs');
const statisticsFileName = './statistics.json';
const statistics = require(statisticsFileName);
if(!statistics.allMessages) statistics.allMessages = 0;
if(!statistics.messagesDaily) statistics.messagesDaily = {};

//bot init
const bot = new TelegramBot(config.token, {polling: false});

//swap function init
const swapFunction = config.remove_unknown ? (c) => {return map[c]} : (c) => {let newLetter = map[c]; return newLetter === undefined ? c : map[c]};

//increase desired statistics by 1 function
function updateStatistics(){
    if(config.statistics.count_messages) {
        statistics.allMessages++;
        if(config.statistics.count_messages_daily) {
            if(!statistics.messagesDaily[getDate()]) statistics.messagesDaily[getDate()] = 1;
            else statistics.messagesDaily[getDate()]++;
        }
    }
}

//hadling messages
bot.on('message', (msg) => {
    let messageText = msg.text;
    if(messageText === undefined) { //if no message has been found check for a caption
        messageText = msg.caption;
        if(messageText === undefined) { //if no caption nor message has been found send accurate response
            bot.sendMessage(
                msg.chat.id, config.no_text_message
            );
            updateStatistics();
            return;
        }
    }
    
    //swap letters and send new message
    bot.sendMessage(
        msg.chat.id, (messageText.split("").map(swapFunction)).join("") 
    );
    updateStatistics();
});

//error logging (for now in console)
bot.on('polling_error', (error) => {
    console.error(Date(), error);
});

//init message
bot.startPolling().then(() => {
    console.log("Bot started");
}).catch((err)=>{
    console.error("error: ", err);
})

//save statistics
if(config.statistics.count_messages) {
    setInterval(() => fs.writeFile(statisticsFileName, JSON.stringify(statistics), writeFileCallback), config.statistics.save_interval)
}

//save error handeling 
function writeFileCallback(err) {
    if(err) return console.error(err);
    console.log("Saving statistics");
}

//hadle exit
function cleanup(x){
    console.log("Stopping server");
    fs.writeFileSync(statisticsFileName, JSON.stringify(statistics), writeFileCallback);
    process.exit(x);
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, cleanup.bind(null, eventType));
})

//helper functions
function getDate(){
    return new Date().toISOString().slice(0,10);
}


console.log("Starting server");
