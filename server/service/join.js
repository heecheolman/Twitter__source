const knex = require('./service.config');

module.exports = {
    insertUser: async ({ phone_number, user_password, real_name, nickname, following, follower, descript }) => {
        const result = await knex('users')
            .insert({ phone_number, user_password, real_name, nickname, following, follower, descript })
            .then(results => results)
            .catch(err => err);
        return result;
    },

    getPhoneNumber: async (phone_number) => {
        const phoneNumberData = await knex('users')
            .select('phone_number')
            .where({ phone_number })
            .then(result => result)
            .catch(err => err);
        return phoneNumberData;
    },

    getNickname: async (nickname) => {
        const nicknameData = await knex('users')
            .select('nickname')
            .where({ nickname })
            .then(result => result)
            .catch(err => err);
        return nicknameData;
    },
};