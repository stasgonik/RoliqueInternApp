const fetch = require('node-fetch');

module.exports = {
    getInstagramPhotos: async (userName) => {
        const url = `https://www.instagram.com/${userName}/?__a=1`;

        const settings = { method: 'Get' };

        const { graphql: { user: { edge_owner_to_timeline_media: { edges } } } } = await fetch(url, settings)
            .then(res => res.json());

        const photos = [];
        for (const object of edges) {
            const path = object.node.thumbnail_resources;
            const photo = path[path.length - 1].src;
            photos.unshift(photo);
        }

        return photos;
    }
};
