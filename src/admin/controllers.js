const ProfileService = require('../profiles/services');
const { StatusCodes } = require('../core/constants');

class AdminController {
    static async bestProfession(req, res, next) {
        const {start, end } = req.query;
        const profile = await ProfileService.getBestProfession(start, end);
        if(profile) {
            return res.status(StatusCodes.SuccessRequest).json({profession: profile.toJSON().profession});
        }
        return res.status(StatusCodes.NotFound).json();
    }

    static async bestClients(req, res, next) {
        const {start, end, limit } = req.query;
        const profiles = await ProfileService.getBestClients(start, end, limit);
        return res.status(StatusCodes.SuccessRequest).json(profiles);
    }
}

module.exports = {
    AdminController
}
