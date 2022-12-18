const { dbModels, sequelize } = require('../core/db');
const { Op, Transaction } = require("sequelize");
const { BEST_CLIENTS_LIMIT } = require('../core/constants');

class ProfileService {
    static async getProfile(id) {
        const query = {id: id || 0};
        return dbModels.models.Profile.findOne({where: query})
    }
    static async getBestProfession(start, end) {
        const db = await sequelize.getDb();
        const andQuery = []
        if(start) {
            andQuery.push({createdAt: {[Op.gte]: start}})
        }
        if(end) {
            andQuery.push({createdAt: {[Op.lte]: end}})
        }
        return dbModels.models.Job.findOne(
            {
                where: {paid: 1, ...(andQuery.length && {[Op.and]: andQuery} || {})},
                include: [{
                    model: dbModels.models.Contract,
                    as: 'Contract',
                    required: true,
                    attributes: [],
                    include: [{model: dbModels.models.Profile, as: 'Contractor', required: true, attributes: []}]
                }],
                attributes: [[db.col('Contract.Contractor.profession'), 'profession'], [db.fn('sum', db.col('price')), 'earnings']],
                group: ['Contract.Contractor.profession'],
                order: db.literal('earnings DESC'),
                limit: 1
            });
    }

    static async getBestClients(start, end, limit) {
        const db = await sequelize.getDb();
        const and = [];
        if(start) {
            and.push({createdAt: {[Op.gte]: start}})
        }
        if(end) {
            and.push({createdAt: {[Op.lte]: end}})
        }
        return dbModels.models.Job.findAll({
            where: {paid: 1, ...(and.length &&  {[Op.and]: and } || {})
            },
            include: [{model: dbModels.models.Contract, as: 'Contract', required: true, attributes: [], include: [{ model: dbModels.models.Profile, as: 'Client', required: true, attributes: [] }]}],
            attributes: [[db.col('Contract.Client.id'), 'id'],[db.literal("firstName || ' ' || lastName"), 'fullName'], [db.fn('sum', db.col('price')), 'paid']],
            group: ['Contract.Client.id'],
            order: db.literal('paid DESC'),
            limit: limit || BEST_CLIENTS_LIMIT,
        });
    }
}

module.exports = ProfileService;
