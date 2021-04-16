const mongoose = require('mongoose');

const { Influencer } = require('../database/models');

module.exports = {
    getAllInfluencers: (filterObj = {}) => Influencer.find(filterObj),

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
