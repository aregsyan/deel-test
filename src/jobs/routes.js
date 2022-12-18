const { Router } = require('express');
const { JobController } = require('./controllers');
const { getProfile } = require('../middleware/getProfile');

const router = Router();

router.route('/unpaid').get(getProfile, JobController.getUnpaid);
router.route('/:id/pay').post(getProfile, JobController.payJob);

module.exports = {
    jobRouter: router,
}
