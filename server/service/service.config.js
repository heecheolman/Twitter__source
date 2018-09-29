const knex = require('knex')({
    client: 'pg',
    version: '9.6',
    connection: {
        host: '',
        user: '',
        password: '',
        database: '',
    },
});

module.exports = knex;
