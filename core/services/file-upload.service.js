const cloudinary = require('cloudinary').v2;
const path = require('path');
const DatauriParser = require('datauri/parser');

const { fileConstants: { MIMETYPE_TO_EXTENSION_MATCHER } } = require('../constants');

const parser = new DatauriParser();

const {
    config: {
        CLOUDINARY_NAME,
        CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET
    }
} = require('../config');

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

module.exports = {
    uploadFile: (file, folder = null) => {
        const file64 = parser.format(path.extname(file.name)
            .toString(), file.data);

        return cloudinary.uploader.upload(file64.content, { folder });
    },

    uploadRawFile: async (rawFile) => {
        const arrData = await rawFile.arrayBuffer();
        const buffer = Buffer.from(arrData);
        const mimetype = rawFile.type;

        if (!MIMETYPE_TO_EXTENSION_MATCHER[mimetype]) {
            return console.log(`Got unknown photo mimetype: ${mimetype}`);
        }

        const file64 = parser.format(MIMETYPE_TO_EXTENSION_MATCHER[mimetype], buffer);
        return cloudinary.uploader.upload(file64.content);
    },

    removeFile: (file, folder = false) => {
        const arrString = file.split('.');
        let string = arrString[arrString.length - 2].split('/')
            .pop();
        if (folder) {
            const Arr = arrString[arrString.length - 2].split('/');
            // eslint-disable-next-line no-shadow
            const folder = Arr[Arr.length - 2];
            string = `${folder}/${string}`;
        }

        console.log(string);
        // eslint-disable-next-line require-await
        cloudinary.uploader.destroy(string, async (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
};
