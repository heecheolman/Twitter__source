const knex = require('./service.config');

module.exports = {
    updateTextContents: async ({ id, contents }) => {
        const result = await knex('twitpost')
            .where({ id })
            .update({ contents })
            .then(result => result)
            .catch(err => err);
        return result;
    },
    updateImagesContents: async ({ id, images }) => {
        const result = await knex('twitpost')
            .where({ id })
            .update({ images })
            .then(result => result)
            .catch(err => err);
        return result;
    },
    removeContents: async ({ id }) => {
        const result = await knex('twitpost')
            .where({ id })
            .del()
            .then(result => result)
            .catch(err => err);
        return result;
    },
};