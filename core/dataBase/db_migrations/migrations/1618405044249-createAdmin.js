// eslint-disable-next-line no-unused-vars
const mongoose = require('../../../core/database/db_migrations');
const { User } = require('../../../core/database/models');

async function up() {
    console.log(User);
    await User.create({
        role: 'admin',
        first_name: 'Admin',
        last_name: 'Rolique',
        email: 'admin@rolique.io',
        password: '$2b$10$poL23Bwei4ts09VytClk2eNoSnYrYwbaAA7ucLwUSad6eqpJJCtaS',
        __v: 0
    });
}

async function down() {
    await User.deleteOne({ email: 'admin@rolique.io' }, (err) => console.log(err));
}

module.exports = {
    up,
    down
};
