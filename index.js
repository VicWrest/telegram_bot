const TelegramApi = require('node-telegram-bot-api');
const controller = require('./controller');
const sequelize = require('./db/db');
const UserModel = require('./models/models');
const TOKEN = '6460840868:AAHDbTb9tVhO9hjtwEfLhp9ZQio_WJ7_ons';
 
const start = async () => {
    try{
        await sequelize.authenticate() //подключение к бд
        await sequelize.sync(); //синхронизация
    }
    catch(err){
        console.log('Ошибка подключения к бд', err);
    }
const bot = new TelegramApi(TOKEN, {polling: true}); //polling - технология, 
//опрашивающая сервер телеграмма с определенной переодичностью, возможно устанавливать переодичность

//функция устанавливающая команды, в телеграме можно высветить их список
bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию о пользователе'},
    {command: '/game', description: 'Начать игру'}
])

//обработчик сообщений
bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    
    if(text === '/start'){
        controller.start(bot, msg);
        return;
    }
    if(text === '/info'){
        controller.info(bot, msg);   
        return; 
    }
    if(text === '/game'){
        controller.game(bot, msg);
        return;
    }
    else {
        return bot.sendMessage(chatId, 'Я тебя не понимаю');
    }
})
//прослушиватель вариантов ответов
bot.on('callback_query', async msg => {
        controller.getResult(bot, msg);
})
};

start();