import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('username', 32).notNullable().unique();
        table.string('email', 64).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('color', 32).notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}

