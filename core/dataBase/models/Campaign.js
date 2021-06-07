const {
    Schema,
    model
} = require('mongoose');

const { magicString: { DATA_BASE_TABLE } } = require('../../constants');

const {
    Brand,
    User
} = require('./index');

const budgetScheme = new Schema({
    totalBudget: Number,
    subBudgets: {
        influencerBudget: {
            type: Number,
            default: null
        },
        socialAdsMediaBudget: {
            type: Number,
            default: null
        },
        productionBudget: {
            type: Number,
            default: null
        },
        travelBudget: {
            type: Number,
            default: null
        },
        handlingFee: {
            type: Number,
            default: null
        },
        otherBudget: {
            type: Number,
            default: null
        },
    }
});

function budgetValidator(scheme) {
    const {
        subBudgets,
        totalBudget
    } = scheme._doc;

    let totalSum = 0;
    let subBudgetsPresent = false;

    for (const subBudgetsKey in subBudgets) {
        if (subBudgets[subBudgetsKey]) {
            subBudgetsPresent = true;
            totalSum += subBudgets[subBudgetsKey];
        }
    }

    if (subBudgetsPresent) {
        return totalSum === totalBudget;
    }

    return true;
}

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
    start_date: Date,
    end_date: Date,
    hashtags: [{ type: String }],
    // mentions: { type: Schema.Types.Mixed },
    _brand: {
        type: Schema.Types.ObjectId,
        required: true
    },
    budget: {
        type: budgetScheme,
        validate: [
            budgetValidator,
            'The sum of all subbudgets does not equal to the total budget'
        ]
    },
    // todo add default role
    // role: { type: String },
    campaign_logo: { type: String },
    _team_lead: {
        type: Schema.Types.ObjectId,
        required: true
    },
    client_description: { type: String },
    internal_note: { type: String },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

campaignSchema.virtual('team_lead', {
    ref: User,
    localField: '_team_lead',
    foreignField: '_id'
});

campaignSchema.virtual('brand', {
    ref: Brand,
    localField: '_brand',
    foreignField: '_id'
});

campaignSchema
    .pre('find', function() {
        this.populate('team_lead');
        this.populate('brand');
    })
    .pre('findOne', function() {
        this.populate('team_lead');
        this.populate('brand');
    });

module.exports = model(DATA_BASE_TABLE.CAMPAIGN, campaignSchema);
