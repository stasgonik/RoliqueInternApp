const router = require('express')
    .Router();

const { authRouter } = require('../auth');
const { emailRouter } = require('../email');
const { userRouter } = require('../user');
const { influencerRouter } = require('../influencer');

router.use('/auth', authRouter);
router.use('/email', emailRouter);
router.use('/users', userRouter);
router.use('/influencers', influencerRouter);

module.exports = router;
