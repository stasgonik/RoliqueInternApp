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

module.exports = model(DATA_BASE_TABLE.BRAND, brandScheme);
