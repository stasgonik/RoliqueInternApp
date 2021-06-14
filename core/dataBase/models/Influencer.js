const {
    Schema,
    model
} = require('mongoose');

const { magicString: { DATA_BASE_TABLE } } = require('../../constants');
const { priorities: { networks: socialNetworksPrio } } = require('../../config');

const socialProfilesScheme = new Schema({
    social_network_name: String,
    social_network_profile: String,
    social_network_followers: Number
});

const youtubeSubSchema = new Schema({
    _id: false,
    videoId: String,
    publishedAt: Date,
    preview: String
});

const instagramSubSchema = new Schema({
    _id: false,
    publishedAt: Date,
    preview: String,
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
    user_name: {
        type: String,
        default: '—'
    },
    profile_picture: String,
    instagram_photos: [instagramSubSchema],
    youtube_videos: [youtubeSubSchema],
    youtube_username: String,
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

influencerScheme.virtual('full_name')
    .get(function() {
        return `${this.first_name} ${this.last_name}`;
    });

influencerScheme.post('save', function(doc) {
    const newUsername = getUsername(doc);
    if (doc.user_name === newUsername) {
        return;
    }

    doc.user_name = newUsername;
    doc.save();
});
// redirect to previous hook
influencerScheme.post(/update/, async function() {
    const doc = await this.model.findOne(this.getQuery());
    doc.save();
});

function getUsername(influencerModel) {
    if (!influencerModel.social_profiles || !influencerModel.social_profiles.length) {
        return '—';
    }

    for (const socialNetwork of socialNetworksPrio) {
        const socialNetworkProfile = influencerModel.social_profiles
            .find(profile => profile.social_network_name === socialNetwork);
        if (socialNetworkProfile) {
            return socialNetworkProfile.social_network_profile;
        }
    }

    return '—';
}

module.exports = model(DATA_BASE_TABLE.INFLUENCER, influencerScheme);
