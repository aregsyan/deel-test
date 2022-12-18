const Sequelize = require("sequelize");

class SequelizeDb {
    constructor() {}

    connect() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite3'
        });
    }

    async getDb() {
        if(this.sequelize) {
            try {
                await this.sequelize.authenticate();
                console.log('Connection has been established successfully.');
                return this.sequelize;
            } catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        } else {
            this.connect();
        }
        return this.sequelize;
    }
}

const dbInstance = new SequelizeDb();

module.exports = dbInstance;
