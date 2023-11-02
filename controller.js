const service = require("./service");
const {gameOptions, againOptions} = require('./options');

class Controller {
    async start(bot, msg){
        const chatId = msg.chat.id;
        await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/2.webp');
        return bot.sendMessage(chatId, `Добро пожаловать в мой телеграм-бот`);
    }
    async info(bot, msg){
        const chatId = msg.chat.id;
        const results = await service.info(chatId);
        return bot.sendMessage(chatId, results);
    }
    async game(bot, msg){
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, а ты угадай');
        const randomNumber = await service.getRandomNumber(chatId);
        return bot.sendMessage(chatId, 'Отгадывай', gameOptions);
    };
    async getResult(bot, msg){
        const chatId = msg.message.chat.id;
        const data = msg.data; //то что указывается в options callback_data
        if(data === '/again'){
            this.game(bot, msg.message);
            return;
        }
        const answer = await service.checkAnswer(chatId, data);
        answer === true? bot.sendMessage(chatId, 'Правильно! Так держать', againOptions):
        bot.sendMessage(chatId, 'Неправильно. Попробуйте еще раз!', againOptions);

    }

}

module.exports = new Controller();