class Service {
    chats = {}; //аналогия бд
    results = {}
    async getRandomNumber(chatId) {
        const randomNumber = Math.floor(Math.random() * 10);
        this.chats[chatId] = randomNumber;
        return randomNumber;
    }
    async checkAnswer(chatId, data){
        if(!this.results[chatId]) this.createResult(chatId);
        if(this.chats[chatId] == data){
            this.results[chatId].correct += 1
            return true;
        }
        else{
            this.results[chatId].incorrect += 1
            return false;
        }
    };
    async createResult(chatId){
        this.results[chatId] = {correct: 0, incorrect: 0}
        return;
    };
    async info(chatId){
        const results = this.results[chatId];
        if(results === undefined){
            return `Здесь будет отображен результат игр. Начните игру конопкой "game"`;
        }
        const {correct, incorrect} = results;
        return `Твой результат ${correct}: правильных ответов, ${incorrect} неправильных ответов`;
    }

}

module.exports = new Service();