const { IgApiClient } = require('instagram-private-api');
const fetch = require('node-fetch');

const {
    config: {
        INSTAGRAM,
        INSTAGRAM_PASS
    }
} = require('../config');

module.exports = {
    experiment: async (username) => {
        const ig = new IgApiClient();
        ig.state.generateDevice(INSTAGRAM);
        await ig.account.login(INSTAGRAM, INSTAGRAM_PASS);
        const targetUser = await ig.user.searchExact(username);
        const reelsFeed = await ig.feed.user(
            targetUser.pk
        );
        const one = await reelsFeed.items();
        const photos = [];
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
