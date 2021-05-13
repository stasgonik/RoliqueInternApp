const router = require('express')
    .Router();

const { authRouter } = require('../auth');
const { emailRouter } = require('../email');
const { userRouter } = require('../user');
const { influencerRouter } = require('../influencer');
const { campaignRouter } = require('../campaign');

router.use('/auth', authRouter);
router.use('/email', emailRouter);
router.use('/users', userRouter);
router.use('/influencers', influencerRouter);
router.use('/campaigns', campaignRouter);

module.exports = router;
