const { models: { Campaign } } = require('../dataBase');

module.exports = {
    createCampaign: (obj) => Campaign.create(obj),
    findAll: async (query) => {
        const campaigns = await Campaign.find(query);
        const count = await Campaign.count(query);

        return {
            data: campaigns,
            count
        };
    },
};
