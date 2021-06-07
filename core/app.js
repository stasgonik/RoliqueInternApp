const express = require('express');
const fileuploader = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const {
    PORT,
    MONGO_URL,
    ALLOWED_ORIGIN
} = require('./config/config');
const {
    apiRouter,
    notFound
} = require('./routes');
const cronRun = require('./cron-jobs');

const app = express();

const _connectDb = async () => {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('db connected..!');

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
};

_connectDb();

const configureCors = (origin, callback) => {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
};

app.use(cors({ origin: configureCors }));

app.use(fileuploader());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'core', 'static')));

app.use('/', apiRouter);
app.use('*', notFound);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || '',
            payload: err.payload || {}
        });
});

console.log(dotenv);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    cronRun();
});
