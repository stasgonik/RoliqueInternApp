const http = require('http');
const fetch = require('node-fetch');

module.exports = {
    getRequestWithHttpModule: () => {
        // The url we want is: 'jsonplaceholder.typicode.com/users'
        const options = {
            host: 'jsonplaceholder.typicode.com',
            path: '/users'
        };

        const callback = (response) => {
            console.log(`statusCode: ${response.statusCode}`);

            let str = '';

            // another chunk of data has been received, so append it to `str`
            response.on('data', (chunk) => {
                str += chunk.toString();
            });

            // the whole response has been received, so we just print it out here
            response.on('end', () => {
                console.log(JSON.parse(str));
            });
        };

        const req = http.request(options, callback);

        req.on('error', error => {
            console.error(error);
        });

        req.end();
    },

    getRequestWithNodeFetch: () => {
        const url = 'https://jsonplaceholder.typicode.com/users';

        const settings = { method: 'Get' };

        return fetch(url, settings)
            .then(res => res.json());
    }
};
