const { Router } = require('express');
const {ContractController} = require('./controllers');
const { getProfile } = require('../middleware/getProfile');

const router = Router();

router.route('/').get(getProfile, ContractController.getContracts);
router.route('/:id').get(getProfile, ContractController.getContractById);

module.exports = {
    contractRouter: router,
}
