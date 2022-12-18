const dbConnection = require('./connection');
const contractModel = require('../../contracts/model');
const profileModel = require('../../profiles/model');
const jobModel = require('../../jobs/model');


class DBModels {
    constructor() {}

    async initialize() {
        this.db = await dbConnection.getDb();
        this.models = {
            Contract: contractModel(this.db),
            Profile: profileModel(this.db),
            Job: jobModel(this.db),
        }
        this.models.Profile.hasMany(this.models.Contract, {as :'Contractor',foreignKey:'ContractorId'})
        this.models.Contract.belongsTo(this.models.Profile, {as: 'Contractor'})
        this.models.Profile.hasMany(this.models.Contract, {as : 'Client', foreignKey:'ClientId'})
        this.models.Contract.belongsTo(this.models.Profile, {as: 'Client'})
        this.models.Contract.hasMany(this.models.Job)
        this.models.Job.belongsTo(this.models.Contract)
    }
}

const dbModelsInstance = new DBModels();

module.exports = dbModelsInstance;
