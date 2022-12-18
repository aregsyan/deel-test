const express = require('express');
const bodyParser = require('body-parser');
const db = require('./core/db');
const { contractRouter } = require('./contracts/routes');
const { jobRouter } = require('./jobs/routes');
const { adminRouter } = require('./admin/routes');


/**
 * FIX ME!
 * @returns contract by id
 */


class App {
    constructor() {
        this.app = express();
        this.initMiddlewares();
        this.initRoutes();
    }

    async start(port) {
        await db.dbModels.initialize();
        const sequelizeDb = await db.sequelize.getDb();
        this.app.set('models', db.dbModels.models);
        this.app.set('sequelize', sequelizeDb);
        this.app.listen(port, () => {
            console.log('Express App Listening on Port 3001');
        });
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
