<h1 align="center">telegram small text bot</h1>

<p align="center">
This is a simple telegram bot for making your message font small
You can test it here: <a href="https://t.me/smallText_bot">@smallText_bot</a>
</p>

***
<h3 align="center">Usage</h3>

<p align="center">
  Just send a message to my bot and it will reply with your message but with <i>cool</i> little letters.<br>
Now you can copy it and send it to your friends<br><br>
<img src="example.jpg" />
</p>

***
<h3 align="center">Installation</h3>

```
* git clone https://github.com/JonaszPotoniec/telegramSmallTextBot.git
* npm install  
* <insert your bot token into config.json>  
* npm start  
```
***
<h3 align="center">Settings</h3>

<h4 align="center">Settings are stored in config.json</h4>



|setting      | description |
|-------------|-------------|
| `remove_unknown`       | Defines if characters that can't be converted should be deleted |
| `token`     | This is your bot token. It's required and can be easily obtained from [Bot Father](https://telegram.me/BotFather)|
| `no_text_message`     | Message sent if no text has been found |
| `count_messages`     | Defines if number of messages should be counted and saved in statistics.json |
| `count_messages_daily`     | Grouping messages by days. It can slighty increase memory usage over time |
| `save_interval`     | How often statistics should be saved. They are also saved on exit |


