const {
    influencerService,
    fileService,
    instagramService
} = require('../services');
const {
    ErrorHandler,
    errorCodes,
    errorMessages: { INFLUENCER_NOT_FOUND },
    successMessages
} = require('../error');

module.exports = {
    getAllInfluencers: async (req, res, next) => {
        try {
            const influencers = await influencerService.getAllInfluencers(req.query);

            res.json(influencers);
        } catch (e) {
            next(e);
        }
    },
    getInfluencerById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const isInfluencerExist = await influencerService.doesInfluencerExist({ _id: id });

            if (!isInfluencerExist) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, INFLUENCER_NOT_FOUND.customCode, INFLUENCER_NOT_FOUND.message);
            }

            const influencer = await influencerService.getInfluencerById(id);

            if (influencer.user_name !== '—') {
                influencer.instagram_photos = await instagramService.getInstagramPhotos(influencer.user_name);
            }

            res.json(influencer);
        } catch (e) {
            next(e);
        }
    },
    createInfluencer: async (req, res, next) => {
        try {
            const {
                avatar
            } = req;

            if (avatar) {
                const { url } = await fileService.uploadFile(avatar);
                req.body = {
                    ...req.body,
                    profile_picture: url
                };
            }

            await influencerService.createInfluencer(req.body);

            res.send(successMessages.CREATE);
        } catch (e) {
            next(e);
        }
    },
    updateInfluencer: async (req, res, next) => {
        try {
            const {
                body,
                id
            } = req;

            await influencerService.updateInfluencerById(id, body);

            const newInfluencer = await influencerService.getSingleInfluencer({ _id: id });

            res.json(newInfluencer);
        } catch (e) {
            next(e);
        }
    }
};
