const Sequelize = require("sequelize");

class SequelizeDb {
    constructor() {}

    connect(config) {
        this.sequelize = new Sequelize({
            dialect: config.dialect,
            storage: config.storage,
        });
    }

    async close() {
        return this.sequelize.close();
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
