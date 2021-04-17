const router = require('express')
    .Router();

const { influencerController } = require('../../controllers');
const { influencerMiddleware, authMiddleware } = require('../../middlewares');

router.get('/', authMiddleware.checkAccessToken, influencerController.getAllInfluencers);

router.post('/',
    influencerMiddleware.normalizeRequestData,
    influencerMiddleware.isInfluencerValid,
    influencerController.createInfluencer);

module.exports = router;
