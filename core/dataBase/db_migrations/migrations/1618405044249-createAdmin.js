const { User } = require('../../models');

async function up() {
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
