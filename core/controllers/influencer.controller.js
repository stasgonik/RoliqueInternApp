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
const { magicString: { SOCIAL_NETWORKS } } = require('../constants');

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

            let influencer = await influencerService.getInfluencerById(id);

            const instagramProfile = influencer.social_profiles
                .find(profile => profile.social_network_name === SOCIAL_NETWORKS.INSTAGRAM);

            if (instagramProfile) {
                const photos = await instagramService.experiment(influencer.user_name);

                const photoFiles = await instagramService.fetchPhotoUrls(photos);

                // TODO: delete old photos
                const cloudUrlsPromises = photoFiles.map(file => fileService.uploadRawFile(file));

                let cloudUrls = await Promise.allSettled(cloudUrlsPromises);
                cloudUrls = cloudUrls.map(promiseObj => promiseObj.value.url);

                influencer = {
                    ...influencer._doc,
                    instagram_photos: cloudUrls
                };
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
