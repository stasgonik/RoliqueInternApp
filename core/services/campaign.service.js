const { models: { Campaign } } = require('../dataBase');

module.exports = {
    createCampaign: (obj) => Campaign.create(obj),
    findAll: (query) => Campaign.find(query),
};
