const router = require('express').Router();

const { authRouter } = require('../auth');
const { emailRouter } = require('../email');
const { userRouter } = require('../user');
const { influencerRouter } = require('../influencer');

const { instagramService } = require('../../services');

router.use('/auth', authRouter);
router.use('/email', emailRouter);
router.use('/users', userRouter);
router.use('/influencers', influencerRouter);

// DELETE LATER
router.use('/test', async (req, res) => {
    // prints users to the console
    instagramService.getRequestWithHttpModule();

    const users = await instagramService.getRequestWithNodeFetch();

    res.json(users);
});

module.exports = router;
