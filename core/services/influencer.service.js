const mongoose = require('mongoose');

const { Influencer } = require('../dataBase/models');
const { queryBuilder } = require('../helper');

module.exports = {
    getAllInfluencers: (query = {}, projection = {}) => {
        const objectFilter = queryBuilder.influencerObjectFilter(query);

        return Influencer.find(objectFilter, projection);
    },

    getInfluencerById: (id) => Influencer.findById(id),

    getSingleInfluencer: (query, projection = {}) => Influencer.findOne(query, projection),

    createInfluencer: (user) => Influencer.create(user),

    doesInfluencerExist: (properties) => Influencer.exists(properties),

    deleteInfluencer: (id) => Influencer.findByIdAndDelete(id, (err) => {
        if (err) console.log(err);
    }),

    updateInfluencerById: (userId, updateObject) => Influencer.updateOne({ _id: userId }, { $set: updateObject }),

    isIdValid: (id) => mongoose.Types.ObjectId.isValid(id),

    // compares two social profile arrays and returns their common (duplicate) values
    compareSocialProfiles: (influencerProfiles, newProfiles) => {
        const duplicateProfiles = [];

        for (const profile of newProfiles) {
            const newProfileName = profile['social_profiles.social_network_profile'];
            const duplicateProfile = influencerProfiles.find(item => item.social_network_profile === newProfileName);

            if (duplicateProfile) {
                duplicateProfiles.push(duplicateProfile.social_network_name);
            }
        }

        return duplicateProfiles;
    }
};
