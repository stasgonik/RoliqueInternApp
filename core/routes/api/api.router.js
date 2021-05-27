const router = require('express')
    .Router();

const { authRouter } = require('../auth');
const { emailRouter } = require('../email');
const { userRouter } = require('../user');
const { influencerRouter } = require('../influencer');
const { campaignRouter } = require('../campaign');
const { brandRouter } = require('../brand');

router.use('/auth', authRouter);
router.use('/email', emailRouter);
router.use('/users', userRouter);
router.use('/influencers', influencerRouter);
router.use('/campaigns', campaignRouter);
router.use('/brands', brandRouter);

module.exports = router;
