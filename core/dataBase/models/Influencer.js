const {
    Schema,
    model
} = require('mongoose');

const { DATA_BASE_TABLE } = require('../../constants/magic-string.enum');
const { priorities: { networks: socialNetworksPrio } } = require('../../config');

const socialProfilesScheme = new Schema({
    social_network_name: String,
    social_network_profile: String,
    social_network_followers: Number
});

const influencerScheme = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    birthdate: Date,
    social_profiles: [socialProfilesScheme],
    profile_picture: String, // relative path in the static folder
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

influencerScheme.virtual('full_name').get(function() {
    return `${this.first_name} ${this.last_name}`;
});

influencerScheme.virtual('user_name').get(function() {
    return getUsername(this);
});

function getUsername(influencerModel) {
    if (!influencerModel.social_profiles.length) {
        return '-';
    }

    for (const socialNetwork of socialNetworksPrio) {
        const socialNetworkProfile = influencerModel.social_profiles
            .find(profile => profile.social_network_name === socialNetwork);
        if (socialNetworkProfile) {
            return socialNetworkProfile.social_network_profile;
        }
    }

    return '-';
}

module.exports = model(DATA_BASE_TABLE.INFLUENCER, influencerScheme);
