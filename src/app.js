const express = require('express');
const bodyParser = require('body-parser');
const { createHttpTerminator } = require('http-terminator');
const db = require('./core/db');
const { contractRouter } = require('./contracts/routes');
const { jobRouter } = require('./jobs/routes');
const { adminRouter } = require('./admin/routes');
const config = require('./core/config');


class App {
    constructor() {
        this.app = express();
        this.initMiddlewares();
        this.initRoutes();
    }

    async start(port, sequelize) {
        db.sequelize.connect(sequelize || config.sequelize);
        await db.dbModels.initialize();
        const sequelizeDb = await db.sequelize.getDb();
        this.app.set('models', db.dbModels.models);
        this.app.set('sequelize', sequelizeDb);
        this.server = this.app.listen(port || config.http.port, () => {
            console.log(`Express App Listening on Port ${port || config.http.port}`);
        });
        this.httpTerminator = createHttpTerminator({
            server: this.server,
        });
    }

    async close() {
        try {
            await db.sequelize.close();
            await this.httpTerminator.terminate();
        } catch(e) {
            console.log(`Error in closing app: ${e}`)
        }
    }

    initRoutes() {
        this.app.use('/contracts', contractRouter);
        this.app.use('/jobs', jobRouter);
        this.app.use('/admin', adminRouter);
    }

    initMiddlewares() {
        this.app.use(bodyParser.json());
    }
}

module.exports = App;
