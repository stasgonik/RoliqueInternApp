const {
    influencerService,
    fileService,
    youtubeService,
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
            const youtubeProfile = social_profiles.find(profile => profile.social_network_name === SOCIAL_NETWORKS.YOUTUBE);
            if (instagramProfile) {
                const photos = await instagramService.getPhotosUrls(instagramProfile.social_network_profile);
                if (photos.length) {
                    const photoFiles = await instagramService.fetchPhotoUrls(photos);

                    const cloudUrlsPromises = photoFiles.map(file => {
                        const preview = fileService.uploadRawFile(file.preview);
                        return {
                            preview,
                            publishedAt: file.publishedAt,
                            id: file.id
                        };
                    });
                    const instagramPhotos = [];
                    for (const cloudUrlsPromise of cloudUrlsPromises) {
                        // eslint-disable-next-line no-await-in-loop
                        const { url } = await cloudUrlsPromise.preview;
                        instagramPhotos.push({
                            preview: url,
                            publishedAt: cloudUrlsPromise.publishedAt,
                            id: cloudUrlsPromise.id,
                            social_name: 'instagram'
                        });
                    }
                    req.body.instagram_photos = instagramPhotos;
                }
            }

            if (youtubeProfile) {
                const {
                    videoUrl,
                    username
                } = await youtubeService.getYouTubeVideosByUrl(youtubeProfile.social_network_profile);
                req.body.youtube_videos = videoUrl;
                youtubeProfile.social_network_url = youtubeProfile.social_network_profile;
                youtubeProfile.social_network_profile = username;
                req.body.social_profiles = req.body.social_profiles.filter(value => value.social_network_name !== 'youtube');
                req.body.social_profiles = [
                    ...req.body.social_profiles,
                    youtubeProfile
                ];
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
                body: { social_profiles },
                instagramChanged,
                youtubeChanged
            } = req;

            if (avatar) {
                const { url } = await fileService.uploadFile(avatar);
                req.body = {
                    ...req.body,
                    profile_picture: url
                };
            }

            const oldInfluencer = await influencerService.getSingleInfluencer({ _id: id });

            let instagramProfile;
            if (instagramChanged && social_profiles) {
                instagramProfile = social_profiles.find(profile => profile.social_network_name === SOCIAL_NETWORKS.INSTAGRAM);
            }

            if (instagramProfile) {
                if (oldInfluencer.instagram_photos) {
                    // eslint-disable-next-line max-len
                    const removeFilesPromises = oldInfluencer.instagram_photos.map(photo => fileService.removeFile(photo.preview));
                    await Promise.allSettled(removeFilesPromises);
                }

                const photos = await instagramService.getPhotosUrls(instagramProfile.social_network_profile);

                if (photos.length) {
                    const photoFiles = await instagramService.fetchPhotoUrls(photos);

                    const cloudUrlsPromises = photoFiles.map(file => {
                        const preview = fileService.uploadRawFile(file.preview);
                        return {
                            preview,
                            publishedAt: file.publishedAt,
                            id: file.id
                        };
                    });
                    const instagramPhotos = [];
                    for (const cloudUrlsPromise of cloudUrlsPromises) {
                        // eslint-disable-next-line no-await-in-loop
                        const { url } = await cloudUrlsPromise.preview;

                        instagramPhotos.push({
                            preview: url,
                            publishedAt: cloudUrlsPromise.publishedAt,
                            id: cloudUrlsPromise.id,
                            social_name: 'instagram'
                        });
                    }

                    req.body.instagram_photos = instagramPhotos;
                } else {
                    req.body.instagram_photos = [];
                }
            }

            if (youtubeChanged && social_profiles) {
                const youtubeProfile = social_profiles.find(profile => profile.social_network_name === SOCIAL_NETWORKS.YOUTUBE);
                const {
                    username,
                    videoUrl
                } = await youtubeService.getYouTubeVideosByUrl(youtubeProfile.social_network_profile);
                req.body.youtube_videos = videoUrl;
                youtubeProfile.social_network_url = youtubeProfile.social_network_profile;
                youtubeProfile.social_network_profile = username;

                req.body.social_profiles = req.body.social_profiles.filter(value => value.social_network_name !== 'youtube');
                req.body.social_profiles = [
                    ...req.body.social_profiles,
                    youtubeProfile
                ];
            }

            await influencerService.updateInfluencerById(id, req.body);

            const newInfluencer = await influencerService.getSingleInfluencer({ _id: id });

            res.json(newInfluencer);
        } catch (e) {
            next(e);
        }
    }
};
