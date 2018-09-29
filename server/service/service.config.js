const knex = require('knex')({
    client: 'pg',
    version: '10.4',
    connection: {
        host: '',
        user: '',
        password: '',
        database: '',
    },
});

module.exports = knex;
