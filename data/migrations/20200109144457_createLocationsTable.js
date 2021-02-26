exports.up = function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(() => {
    return knex.schema.createTable("locations", table => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .default(knex.raw("uuid_generate_v4()"));
      table.string("name", 128).notNullable();
      table.string("description");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .uuid("kingdom_id")
        .references("id")
        .inTable("kingdoms")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("locations");
};
