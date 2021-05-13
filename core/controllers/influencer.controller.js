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

            const doesInfluencerExist = await influencerService.doesInfluencerExist({ _id: id });

            if (!doesInfluencerExist) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, INFLUENCER_NOT_FOUND.customCode, INFLUENCER_NOT_FOUND.message);
            }

            const influencer = await influencerService.getInfluencerById(id);

            res.json(influencer);
        } catch (e) {
            next(e);
        }
    },
    createInfluencer: async (req, res, next) => {
        try {
            const {
                avatar,
                body: { social_profiles }
            } = req;

            if (avatar) {
                const { url } = await fileService.uploadFile(avatar);
                req.body = {
                    ...req.body,
                    profile_picture: url
                };
            }

            const instagramProfile = social_profiles.find(profile => profile.social_network_name === SOCIAL_NETWORKS.INSTAGRAM);
            if (instagramProfile) {
                const photos = await instagramService.getPhotosUrls(instagramProfile.social_network_profile);
                if (photos.length) {
                    const photoFiles = await instagramService.fetchPhotoUrls(photos);

                    let cloudUrlsPromises = photoFiles.map(file => fileService.uploadRawFile(file));
                    cloudUrlsPromises = await Promise.allSettled(cloudUrlsPromises);

                    const cloudUrls = cloudUrlsPromises.map(promiseObj => promiseObj.value.url);

                    req.body.instagram_photos = cloudUrls;
                }
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
                id,
                avatar,
                body: { social_profiles }
            } = req;

            if (avatar) {
                const { url } = await fileService.uploadFile(avatar);
                req.body = {
                    ...req.body,
                    profile_picture: url
                };
            }

            const oldInfluencer = await influencerService.getSingleInfluencer({ _id: id });
            const instagramProfile = social_profiles.find(profile => profile.social_network_name === SOCIAL_NETWORKS.INSTAGRAM);

            if (instagramProfile) {
                if (oldInfluencer.instagram_photos) {
                    const removeFilesPromises = oldInfluencer.instagram_photos.map(photo => fileService.removeFile(photo));
                    await Promise.allSettled(removeFilesPromises);
                }

                const photos = await instagramService.getPhotosUrls(instagramProfile.social_network_profile);
                if (photos.length) {
                    const photoFiles = await instagramService.fetchPhotoUrls(photos);

                    let cloudUrlsPromises = photoFiles.map(file => fileService.uploadRawFile(file));
                    cloudUrlsPromises = await Promise.allSettled(cloudUrlsPromises);

                    const cloudUrls = cloudUrlsPromises.map(promiseObj => promiseObj.value.url);

                    req.body.instagram_photos = cloudUrls;
                } else {
                    req.body.instagram_photos = [];
                }
            }

            await influencerService.updateInfluencerById(id, req.body);

            const newInfluencer = await influencerService.getSingleInfluencer({ _id: id });

            res.json(newInfluencer);
        } catch (e) {
            next(e);
        }
    }
};
