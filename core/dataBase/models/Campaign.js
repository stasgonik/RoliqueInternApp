const {
    Schema,
    model
} = require('mongoose');

const { DATA_BASE_TABLE } = require('../../constants/magic-string.enum');

const campaignSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    effort: {
        type: String,
        required: true
    },
    // start_date: {
    //     type: Date,
    //     required: true
    // },
    // end_date: {
    //     type: Date,
    //     required: true
    // },
    hashtags: { type: String },
    mentions: { type: Schema.Types.Mixed },
    brand: [String],
    // todo add defoult role
    role: { type: String },
    // campaign_logo: { type: String },
    client_description: { type: String },
    internal_note: { type: String },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});
//
campaignSchema.virtual('_mentions', {
    ref: DATA_BASE_TABLE.INFLUENCER,
    localField: 'mentions',
    foreignField: 'user_name'
});

campaignSchema
    .pre('find', function() {
        this.populate('_mentions');
    })
    .pre('findOne', function() {
        this.populate('_mentions');
    });

module.exports = model(DATA_BASE_TABLE.CAMPAIGN, campaignSchema);
