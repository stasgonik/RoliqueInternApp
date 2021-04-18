const router = require('express')
    .Router();

const { influencerController } = require('../../controllers');
const {
    influencerMiddleware,
    authMiddleware,
    userMiddleware,
    fileMiddleware
} = require('../../middlewares');
const { ROLES } = require('../../constants/magic-string.enum');

router.get('/', authMiddleware.checkAccessToken, influencerController.getAllInfluencers);
// TODO: middleware to check if there are any influencers with the same account name
router.post('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkRole([ROLES.ADMIN, ROLES.MANAGER]),
    influencerMiddleware.normalizeRequestData,
    influencerMiddleware.isInfluencerValid,
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    influencerController.createInfluencer);

router.get('/:id', authMiddleware.checkAccessToken, influencerController.getInfluencerById);
router.put('/:id',
    authMiddleware.checkAccessToken,
    influencerMiddleware.checkIsUpdateInfluencer,
    influencerController.updateInfluencer);

module.exports = router;
