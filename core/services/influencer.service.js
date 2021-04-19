const mongoose = require('mongoose');

const { Influencer } = require('../database/models');
const { queryBuilder } = require('../helper');

module.exports = {
    getAllInfluencers: (query = {}) => {
        const objectFilter = queryBuilder.influencerObjectFilter(query);

        return Influencer.find(objectFilter);
    },

    getInfluencerById: (id) => Influencer.findById(id),

    getSingleInfluencer: (query) => Influencer.findOne(query),

    createInfluencer: (user) => Influencer.create(user),

    doesInfluencerExist: (properties) => Influencer.exists(properties),

    deleteInfluencer: (id) => Influencer.findByIdAndDelete(id, (err) => {
        if (err) console.log(err);
    }),

    updateInfluencerById: (userId, updateObject) => Influencer.updateOne({ _id: userId }, { $set: updateObject }),

    isIdValid: (id) => mongoose.Types.ObjectId.isValid(id),
};
