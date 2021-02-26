exports.up = function (knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(() => {
    return knex.schema.createTable("journies", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
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
      table
        .uuid("location_id")
        .references("id")
        .inTable("locations")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  });
};

exports.down = function (knex) {
  return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"').then(() => {
    return knex.schema.dropTableIfExists("journies");
  });
};
