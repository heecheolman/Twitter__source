const knex = require('./service.config');

module.exports = {
    getPasswordByPhoneNumber: async (phone_number) => {
        const password = await knex('users')
            .where({ phone_number })
            .select('user_password')
            .then(password => password)
            .catch(err => err);
        return password;
    },
    getUserDataByPhoneNumber: async (phone_number) => {
        const userData = await knex('users')
            .where({ phone_number })
            .select('id', 'real_name', 'nickname', 'following', 'follower', 'descript')
            .then(userData => userData)
            .catch(err => err);
        return userData;
    },
};