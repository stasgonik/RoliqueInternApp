const { google } = require('googleapis');

const service = google.youtube('v3');

const { config: { YOUTUBE_API_KEY } } = require('../config');

module.exports = {
    getYouTubeVideoByUsername: async (username) => {
        try {
            const { data } = await service.channels.list({
                key: YOUTUBE_API_KEY,
                part: 'snippet,contentDetails,statistics',
                forUsername: username
            });
            const channelId = data.items[0].id;

            const { data: { items } } = await service.search.list({
                key: YOUTUBE_API_KEY,
                part: 'snippet',
                channelId,
                order: 'date',
                type: 'video'
            });

            return items;
        } catch (e) {
            console.log(e);
            return e;
        }
    }
};
