const { dbModels, sequelize } = require('../core/db');
const { Op } = require("sequelize");
const { addProfileToQuery } = require('../core/utils');

class JobService {

    static async getUnpaidJobs(profile) {
        let query = {
            paid: {[Op.not]: true
            },
            '$Contract.status$': 'in_progress',
            ...addProfileToQuery(profile, {client: '$Contract.ClientId$', contractor: '$Contract.ContractorId$'}),
        };
        return dbModels.models.Job.findAll({
            where: query,
            include: [{model: dbModels.models.Contract, as: 'Contract', required: true}],
        });
    }

    static async payJob(profile, id) {
        const { Job, Profile, Contract } = dbModels.models;
        const db = await sequelize.getDb();
        const t = await db.transaction();
        try {
            const job = await Job.findOne({
                where: {
                    id,
                    ...addProfileToQuery(profile, {client: '$Contract.ClientId$', contractor: '$Contract.ContractorId$'}),
                },
                include: [{model: Contract, as: 'Contract', required: true, include: [{ model: Profile, as: 'Client', required: true }]}],
                transaction: t,
            });
            if(!job)  {
                throw new Error('job for client not found!')
            }
            if(job.Contract.Client.balance >= job.price) {
                await Promise.all([
                    Profile.increment({balance: job.price }, {where: {id: job.Contract.ContractorId}, transaction: t}),
                    Profile.decrement({balance: job.price}, {where:{id: job.Contract.ClientId}, transaction: t}),
                    Job.update({paid: 1, paymentDate: new Date().toISOString()}, {where: { id }, transaction: t}),
                ]);
            }
            await t.commit();
        } catch(e) {
            await t.rollback();
            throw e;
        }
    }
}

module.exports = JobService;
