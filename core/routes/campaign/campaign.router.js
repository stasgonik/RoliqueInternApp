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

router.get('/', campaignMiddleware.buildQueryParams, campaignController.getAllCampaign);

router.post('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkRole([ROLES.ADMIN, ROLES.MANAGER]),
    campaignMiddleware.isNewCampaignValid,
    campaignMiddleware.doesCampaignExist,
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    campaignController.createCampaign);

router.put('/', (req, res) => res.json('update'));

module.exports = router;
