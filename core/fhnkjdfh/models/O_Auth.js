const { Schema, model } = require('mongoose');

const { magicString: { DATA_BASE_TABLE: { USER, O_AUTH } } } = require('../../constants');

const o_authSchema = new Schema({
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: USER },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(O_AUTH, o_authSchema);
