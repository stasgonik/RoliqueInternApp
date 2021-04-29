const fetch = require('node-fetch');

const { IG } = require('../helper');

module.exports = {
    getPhotos: async (username) => {
        const ig = await IG.getInstance();
        const photos = [];
        const targetUser = await ig.user.searchExact(username);
        const reelsFeed = await ig.feed.user(
            targetUser.pk
        );
        let one = [];
        try {
            one = await reelsFeed.items();
        } catch (e) {
            return photos;
        }

        for (const post of one) {
            if (photos.length < 12) {
                if (post.image_versions2) {
                    photos.push(post.image_versions2.candidates[0].url);
                }

                if (post.carousel_media && photos.length < 12) {
                    for (const test of post.carousel_media) {
                        if (photos.length < 12) {
                            photos.push(test.image_versions2.candidates[0].url);
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
            const newPhotoPromise = fetch(photoUrl).then(res => res.blob());
            allPromises.push(newPhotoPromise);
        }

        const promisesResults = await Promise.allSettled(allPromises);
        // eslint-disable-next-line array-callback-return
        return promisesResults.map(promiseObj => {
            if (promiseObj.status === 'fulfilled') {
                return promiseObj.value;
            }
        });
    }
};
