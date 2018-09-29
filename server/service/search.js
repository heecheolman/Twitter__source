const knex = require('./service.config');

module.exports = {
    getNicknameLists: async (id, input) => {
        let nicknames = await knex('users')
            .select('nickname', 'id', 'following', 'follower', 'descript')
            .where('nickname', 'like', `%${ input }%`)
            .whereNot('id', id)
            .then(result => result)
            .catch(err => err);
        return nicknames;
    },
};