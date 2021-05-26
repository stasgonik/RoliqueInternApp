const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { brandValidator } = require('../../validators');
const { brandService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const {
            body,
            avatar
        } = req;

        const { error } = brandValidator.createBrandValidator.validate(body);

        // eslint-disable-next-line max-len
        const brandExist = await brandService.getSingleBrand({ name: { $regex: new RegExp(`^${body.name.toLowerCase()}`, 'i') } });

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.BRAND_NAME_NOT_VALID.customCode, error.details[0].message);
        }

        if (brandExist) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.BRAND_NAME_NOT_VALID.customCode, 'Brand exist!');
        }

        if (!avatar) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.BRAND_LOGO_NOT_FOUND.customCode,
                errorMessages.BRAND_LOGO_NOT_FOUND.message);
        }

        req.brand_logo = req.avatar;
        next();
    } catch (e) {
        next(e);
    }
};
