const fetch = require('node-fetch');

const { IG } = require('../helper');

module.exports = {
    getPhotosUrls: async (username) => {
        const ig = await IG.getInstance();
        const photos = [];
        let targetUser = {};
        try {
            targetUser = await ig.user.searchExact(username);
        } catch (e) {
            return photos;
        }
        if (targetUser && targetUser.is_private) {
            return photos;
        }
        const reelsFeed = await ig.feed.user(
            targetUser.pk
        );
        const page = await reelsFeed.items();

        for (const post of page) {
            const id = post.code;
            const publishedAt = new Date(+post.taken_at * 1000);
            if (photos.length < 12) {
                if (post.image_versions2) {
                    photos.push({
                        preview: post.image_versions2.candidates[0].url,
                        publishedAt,
                        id
                    });
                }

                if (post.carousel_media && photos.length < 12) {
                    for (const photo of post.carousel_media) {
                        if (photos.length < 12) {
                            photos.push({
                                preview: photo.image_versions2.candidates[0].url,
                                publishedAt,
                                id
                            });
                        }
                    }
                }
            }
        }

        return photos;
    },

    fetchPhotoUrls: async (photoUrls) => {
        const allPromises = [];

        for (const photoUrl of photoUrls) {
            const newPhotoPromise = fetch(photoUrl.preview)
                .then(res => res.blob());
            allPromises.push({
                preview: newPhotoPromise,
                publishedAt: photoUrl.publishedAt,
                id: photoUrl.id
            });
        }

        const istagramPhotos = [];
        for (const allPromise of allPromises) {
            // eslint-disable-next-line no-await-in-loop
            const preview = await allPromise.preview;

            istagramPhotos.push({
                preview,
                publishedAt: allPromise.publishedAt,
                id: allPromise.id
            });
        }
        return istagramPhotos;
    }
};
