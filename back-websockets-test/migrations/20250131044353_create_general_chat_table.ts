import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('general_chat', (table) => {
        table.increments('message_id').primary();
        table.text('message').notNullable();
        table.integer('user_id').notNullable();
        table.timestamps(true, true);

        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('general_chat');
}

