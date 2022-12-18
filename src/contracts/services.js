const { dbModels } = require('../core/db');
const { addProfileToQuery } = require('../core/utils');
const { Op } = require("sequelize");



class ContractService {

    static async getActiveContracts(profile) {
        let query = {
            [Op.or]: [
                {status: 'in_progress'},
                {status: 'new'}
            ],
            ...addProfileToQuery(profile, {client: 'ClientId', contractor: 'ContractorId'}),
        };
        return dbModels.models.Contract.findAll({ where: query });
    }

    static async getContract(profile, id) {
        let query = {
            id,
            ...addProfileToQuery(profile, {client: 'ClientId', contractor: 'ContractorId'}),
        };
        return dbModels.models.Contract.findOne({ where: query });
    }
}

module.exports = ContractService;
