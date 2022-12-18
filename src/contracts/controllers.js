const ContractService = require('./services');
const { StatusCodes } = require('../core/constants');

class ContractController {
    static async getContracts(req, res, next) {
        const contracts = await ContractService.getActiveContracts(req.profile);
        return res.status(StatusCodes.SuccessRequest).json(contracts);
    }

    static async getContractById(req, res, next) {
        const { id } = req.params;
        const profile = { ...req.profile };
        const contract = await ContractService.getContract(profile, id);
        if(!contract) {
            return res.status(StatusCodes.NotFound).json();
        }
        return res.status(StatusCodes.SuccessRequest).json(contract);
    }
}

module.exports = {
    ContractController
}
