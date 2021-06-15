const { google } = require('googleapis');

const service = google.youtube('v3');

const { config: { YOUTUBE_API_KEY } } = require('../config');

module.exports = {
    getYouTubeVideosByUrl: async (url) => {
        try {
            const sorting = (items) => {
                const videoUrl = [];
                const username = items.pop().snippet.channelTitle;

                items.map(value => videoUrl.push({
                    id: value.id.videoId,
                    publishedAt: value.snippet.publishedAt,
                    preview: value.snippet.thumbnails.high.url,
                    social_name: 'youtube'
                }));
                return {
                    videoUrl,
                    username
                };
            };

            const search = async (params) => {
                console.log({ name: 'vaas', ...params });
                const { data } = await service.search.list({
                    key: YOUTUBE_API_KEY,
                    part: 'snippet',
                    ...params,
                    maxResults: '13',
                    order: 'date',
                    type: 'video'
                });
                return sorting(data.items);
            };

            const channelType = url.split('/')[url.split('/').length - 2];
            const username = url.split('/')
                .pop();

            if (channelType === 'user') {
                const channelDetails = await service.channels.list({
                    key: YOUTUBE_API_KEY,
                    part: 'snippet,contentDetails,statistics',
                    forUsername: username,
                });
                const channelId = channelDetails.data.items[0] && channelDetails.data.items[0].id;

                return search({ channelId });
            }
            if (channelType === 'c') {
                const { data: { items } } = await service.search.list({
                    key: YOUTUBE_API_KEY,
                    part: 'snippet',
                    type: 'channel',
                    q: username,
                    maxResults: 50,
                    order: 'relevance',
                });
                const id = items[0].id.channelId ? items[0].id.channelId : items[0].snippet.channelId;
                return search({ channelId: id });
            }
            return search({ channelId: username });
        } catch (e) {
            console.log(e);
            return e;
        }
    }
};
