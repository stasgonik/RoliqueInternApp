const {
    brandService,
    fileService
} = require('../services');

module.exports = {
    getAllBrands: async (req, res, next) => {
        try {
            const brands = await brandService.getAllBrands();

            res.json(brands);
        } catch (e) {
            next(e);
        }
    },
    createBrand: async (req, res, next) => {
        try {
            const {
                body,
                brand_logo
            } = req;

            const { url } = await fileService.uploadFile(brand_logo, 'brand_logo');

            const brand = await brandService.createBrand({
                ...body,
                photoUrl: url
            });

            res.json(brand);
            next();
        } catch (e) {
            next(e);
        }
    },
};
