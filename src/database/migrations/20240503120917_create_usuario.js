
exports.up = function(knex) {
    return knex.schema.createTable('usuario', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('telefone').unique();
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('usuario');
};
