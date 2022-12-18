const { Router } = require('express');
const { AdminController } = require('./controllers');

const router = Router();

router.route('/best-profession').get(AdminController.bestProfession);
router.route('/best-clients').get(AdminController.bestClients);

module.exports = {
    adminRouter: router,
}
