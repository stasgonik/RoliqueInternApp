const {
    Schema,
    model
} = require('mongoose');

const { DATA_BASE_TABLE } = require('../../constants/magic-string.enum');

const brandScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    photoUrl: String
});

const budgetScheme = new Schema({
    totalBudget: Number,
    subBudgets: [{ // for example, Production Budget
        target: String, // for example, Production
        amount: Number
    }],
    validate: [
        budgetValidator,
        'Schema validation error: the sum of all subbudgets does not equal to the total budget'
    ]
});

function budgetValidator(budget) {
    const { subBudgets, totalBudget } = budget;
    if (!subBudgets) {
        return true;
    }

    const totalSum = subBudgets.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    return totalSum === totalBudget;
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
    hashtags: { type: String },
    mentions: { type: Schema.Types.Mixed },
    brand: [brandScheme],
    budget: budgetScheme,
    // todo add default role
    role: { type: String },
    // campaign_logo: { type: String },
    client_description: { type: String },
    internal_note: { type: String },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

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
