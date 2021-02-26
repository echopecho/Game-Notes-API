exports.up = function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(() => {
    return knex.schema.createTable("pcs", table => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("char_name").notNullable();
      table.string("player_name").notNullable();
      table.string("description");
      table
        .uuid("author_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .uuid("campaign_id")
        .references("id")
        .inTable("campaigns")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("pcs");
};
