const { dbModels } = require('../core/db');
const ProfileService = require('../profiles/services');


const getProfile = async (req, res, next) => {
    const {Profile} = req.app.get('models')
    const id = req.get('profile_id');
    const profile = await ProfileService.getProfile(id);
    if(!profile) return res.status(401).end()
    req.profile = profile
    next()
}
module.exports = {getProfile}
