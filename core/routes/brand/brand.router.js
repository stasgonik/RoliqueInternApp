const router = require('express')
    .Router();

const { brandController } = require('../../controllers');
const {
    brandMiddleware,
    authMiddleware,
    fileMiddleware
} = require('../../middlewares');

router.get('/', authMiddleware.checkAccessToken, brandController.getAllBrands);

router.post('/',
    authMiddleware.checkAccessToken,
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    brandMiddleware.checkIsCreateBrand,
    brandController.createBrand);

module.exports = router;
