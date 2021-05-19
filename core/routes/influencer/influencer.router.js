const router = require('express').Router();

const { influencerController } = require('../../controllers');
const {
    influencerMiddleware,
    authMiddleware,
    userMiddleware,
    fileMiddleware
} = require('../../middlewares');
const { magicString: { ROLES } } = require('../../constants');

router.get('/', authMiddleware.checkAccessToken, influencerController.getAllInfluencers);

router.post('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkRole([
        ROLES.ADMIN,
        ROLES.MANAGER
    ]),
    influencerMiddleware.formSocialProfiles,
    influencerMiddleware.normalizeRequestData,
    influencerMiddleware.isInfluencerValid,
    influencerMiddleware.doesInfluencerExist,
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    influencerController.createInfluencer);

router.get('/:id', authMiddleware.checkAccessToken, influencerController.getInfluencerById);
router.put('/:id',
    authMiddleware.checkAccessToken,
    influencerMiddleware.updateSocialProfiles,
    influencerMiddleware.checkIsUpdateInfluencer,
    influencerMiddleware.areSocialProfilesValid,
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    influencerController.updateInfluencer);

module.exports = router;
