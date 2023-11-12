const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telega_bot', //названгие бд
    'root', //имя пользователя
    'root', //пароль
    {
        host: '82.202.237.138',
        port: 5432,
        dialect: 'postgres'
    }
);
