const knex = require('./service.config');

module.exports = {
    insertPost: async ({ nickname, user_id, contents, images }) => {
        const result = await knex('twitpost')
            .insert({ nickname, user_id, contents, images })
            .then(results => results)
            .catch(err => err);
        return result;
    },

    getPosts: async ({ user_id }) => {
        const following = await knex('users')
            .select('following')
            .where('id', user_id)
            .then(results => results[0].following)
            .catch(err => err);
        const posts = await knex('twitpost')
            .whereIn('user_id', following)
            .orWhere({ user_id })
            .orderBy('created_at', 'desc')
            .then(results => results)
            .catch(err => err);
        return posts;
    },
};