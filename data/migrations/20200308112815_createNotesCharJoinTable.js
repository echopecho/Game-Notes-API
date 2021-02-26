exports.up = function(knex) {
  return knex.schema.createTable("notes-chars", table => {
    table.increments("id").primary();
    table
      .uuid("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .uuid("char_id")
      .references("id")
      .inTable("characters")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.unique(["note_id", "char_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("notes-chars");
};
