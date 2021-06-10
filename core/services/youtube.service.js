const { google } = require('googleapis');

const service = google.youtube('v3');

const { config: { YOUTUBE_API_KEY } } = require('../config');

module.exports = {
    getYouTubeVideosByUrl: async (url) => {
        try {
            const channelType = url.split('/')[url.split('/').length - 2];

            const id = url.split('/').pop();

            const sorting = (items) => {
                const videoUrl = [];

                items.map(value => videoUrl.push(value.id.videoId));

                return videoUrl;
            };
            if (channelType !== 'channel') {
                const username = url.split('/').pop();

                const { data } = await service.channels.list({
                    key: YOUTUBE_API_KEY,
                    part: 'snippet,contentDetails,statistics',
                    forUsername: username,
                });

                const channelId = data.items[0].id;

                const { data: { items } } = await service.search.list({
                    key: YOUTUBE_API_KEY,
                    part: 'snippet',
                    channelId,
                    maxResults: '16',
                    order: 'date',
                    type: 'video'
                });

                return sorting(items);
            }
            const { data: { items } } = await service.search.list({
                key: YOUTUBE_API_KEY,
                part: 'snippet',
                channelId: id,
                maxResults: '16',
                order: 'date',
                type: 'video'
            });

            return sorting(items);
        } catch (e) {
            console.log(e);
            return e;
        }
    }
};
