const router = require('express').Router();
const { influencerController } = require('../../controllers');
const { influencerMiddleware } = require('../../middlewares');

router.post('/', influencerMiddleware.isInfluencerValid, influencerController.createInfluencer);

module.exports = router;
