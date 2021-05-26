const {
    Schema,
    model
} = require('mongoose');

const { DATA_BASE_TABLE } = require('../../constants/magic-string.enum');

const Brand = require('./Brand');
const User = require('./User');

const budgetScheme = new Schema({
    totalBudget: Number,
    subBudgets: { // for example, Production Budget
        type: [{
            target: String, // for example, Production
            amount: Number
        }],
        validate: [
            budgetValidator,
            'Schema validation error: the sum of all subbudgets does not equal to the total budget'
        ]
    }
});

function budgetValidator(budget) {
    const {
        subBudgets,
        totalBudget
    } = budget;

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
    hashtags: [{ type: String }],
    // mentions: { type: Schema.Types.Mixed },
    _brand: {
        type: Schema.Types.ObjectId,
        required: true
    },
    budget: budgetScheme,
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
