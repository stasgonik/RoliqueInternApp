const router = require('express')
    .Router();

const { campaignController } = require('../../controllers');
const {
    authMiddleware,
    fileMiddleware,
    userMiddleware,
    campaignMiddleware
} = require('../../middlewares');

const { magicString: { ROLES } } = require('../../constants');

router.get('/', campaignController.getAllCampaign);

router.post('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkRole([ROLES.ADMIN, ROLES.MANAGER]),
    campaignMiddleware.isNewCampaignValid,
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    campaignController.createCampaign);

module.exports = router;
