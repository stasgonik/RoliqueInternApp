const mongoose = require('mongoose');

const { config: { MONGO_URL } } = require('../../config');

function _connectDb() {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}

_connectDb();
module.exports = mongoose;
