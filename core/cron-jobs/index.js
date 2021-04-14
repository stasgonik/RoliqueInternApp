const cron = require('node-cron');

const { config: { CRON_JOB_PERIOD } } = require('../config');
const deleteOldTokens = require('./delete-old-tokens');

module.exports = () => {
    cron.schedule(CRON_JOB_PERIOD, async () => {
        await deleteOldTokens();
    });
};
