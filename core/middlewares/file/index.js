const {
    errorCodes,
    errorMessages,
    ErrorHandler
} = require('../../error');
const {
    fileConstants,
    sizeLimits
} = require('../../constants');

function sortFile(mimetypesArr, maxSize, mimetype, filesArr, file, size, name) {
    if (mimetypesArr.includes(mimetype)) {
        if (size > maxSize) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.FILE_TOO_BIG.customCode, `${name}: ${errorMessages.FILE_TOO_BIG.message}`);
        }

        filesArr.push(file);
    }
}

module.exports = {
    checkFiles: (req, res, next) => {
        try {
            const { files } = req;
            if (!files) {
                return next();
            }

            const photos = [];
            const fileValues = Object.values(files);

            for (const file of fileValues) {
                const {
                    mimetype,
                    size,
                    name
                } = file;

                sortFile(fileConstants.PHOTOS_MIMETYPES, sizeLimits.PHOTO_MAX_SIZE,
                    mimetype, photos, file, size, name);
            }

            req.photos = photos;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            if (!req.photos) {
                return next();
            }
            if (req.photos.length > 1) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST,
                    errorMessages.TOO_MANY_FILES.customCode, errorMessages.TOO_MANY_FILES.message);
            }

            const [avatar] = req.photos;
            req.avatar = avatar;

            next();
        } catch (e) {
            next(e);
        }
    }
};
