const knex = require('./service.config');

module.exports = {
    updateDescript: async ({ id, descript }) => {
        const result = await knex('users')
            .where({ id })
            .update({ descript })
            .then(result => result)
            .catch(err => err);
        return result;
    }
};