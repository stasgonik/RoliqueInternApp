const { IgApiClient } = require('instagram-private-api');

const {
    config: {
        INSTAGRAM,
        INSTAGRAM_PASS
    }
} = require('../config');

module.exports = {
    experiment: async (username) => {
        const ig = new IgApiClient();
        ig.state.generateDevice(INSTAGRAM_PASS);
        await ig.account.login(INSTAGRAM, INSTAGRAM_PASS);
        // console.log(JSON.stringify(auth));
        const targetUser = await ig.user.searchExact(username);
        const reelsFeed = await ig.feed.user(
            targetUser.pk
        );
        // console.log(reelsFeed);
        const one = await reelsFeed.items();
        let i = 0;
        const photos = [];
        for (const post of one) {
            if (i < 12) {
                i++;
                photos.unshift(post.image_versions2.candidates[0].url);
            }
        }

        return photos;
    }
};
