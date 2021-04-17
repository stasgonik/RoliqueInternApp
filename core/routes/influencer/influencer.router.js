const router = require('express')
    .Router();

const { influencerController } = require('../../controllers');
const {
    influencerMiddleware,
    authMiddleware
} = require('../../middlewares');

router.get('/', authMiddleware.checkAccessToken, influencerController.getAllInfluencers);
router.post('/',
    influencerMiddleware.normalizeRequestData,
    influencerMiddleware.isInfluencerValid,
    influencerController.createInfluencer);

router.get('/:id', authMiddleware.checkAccessToken, influencerController.getInfluencerById);
router.put('/:id',
    authMiddleware.checkAccessToken,
    influencerMiddleware.checkIsUpdateInfluencer,
    influencerController.updateInfluencer);

module.exports = router;
