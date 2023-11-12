const user = require('./models/models');

class Service {
    chats = {}; //аналогия бд
    async getRandomNumber(chatId) {
        const randomNumber = Math.floor(Math.random() * 10);
        this.chats[chatId] = randomNumber;
        return randomNumber;
    }
    async checkAnswer(chatId, data){
        let result;
        const gamer = await user.findOne({chatId});
        if(this.chats[chatId] == data){
            gamer.right += 1
            result = true;
        }
        else{
            result = false;
            gamer.wrong += 1;
        }
        await gamer.save();
        return result;
    };
    async info(chatId){
         const result = await user.findOne({chatId});
         if(!result){
            return `Пользователь не найден. Введите команду "/start", чтобы зарегистрироваться.`
         }
         return `Твой результат ${result.dataValues.right}: правильных ответов, ${result.dataValues.wrong} неправильных ответов`;
    }
    async createUser(chatId){
        const candidate = await user.findOne({chatId});
        if(!candidate){
            await user.create({chatId});
        };
        return;
    }

}

module.exports = new Service();