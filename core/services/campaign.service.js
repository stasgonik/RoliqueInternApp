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
    getSingleCampaign: (params) => Campaign.findOne(params),
    updateById: (id, updateBody) => Campaign.updateOne({ _id: id }, updateBody),
    doesExist: (title) => Campaign.exists({ title })
};
