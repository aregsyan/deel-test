const JobService = require('./services');
const { StatusCodes } = require('../core/constants');

class JobController {
    static async getUnpaid(req, res, next) {
        const contracts = await JobService.getUnpaidJobs(req.profile);
        return res.status(StatusCodes.SuccessRequest).json(contracts);
    }

    static async payJob(req, res, next) {
        const { id } = req.params;
        const profile = { ...req.profile };
        try {
            await JobService.payJob(profile, id);
        } catch(e) {
            return res.status(StatusCodes.BadRequest).json(e);
        }
        return res.status(StatusCodes.SuccessRequest).json();
    }
}

module.exports = {
    JobController
}
