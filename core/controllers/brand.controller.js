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

            let url = 0;
            let brand;

            if (brand_logo) {
                const data = await fileService.uploadFile(brand_logo, 'brand_logo');
                url = data.url;
            }

            if (url) {
                brand = await brandService.createBrand({
                    ...body,
                    photoUrl: url
                });
            } else {
                brand = await brandService.createBrand({
                    ...body,
                });
            }

            res.json(brand);
        } catch (e) {
            next(e);
        }
    },
};
