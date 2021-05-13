const { models: { Campaign } } = require('../database');
//
// module.exports = {
//     createCampaign: (object) => Campaign.create(object),
//     findAll: (query) => Campaign.find(query)
// };

// const { Campaign } = require('../database/models');

module.exports = {
    createCampaign: (obj) => Campaign.create(obj),
    findAll: (query) => Campaign.find(query),
};
