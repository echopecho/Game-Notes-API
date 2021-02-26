exports.up = function(knex) {
  return knex.schema.createTable("notes-npcs", table => {
    table.increments();
    table
      .uuid("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .uuid("npc_id")
      .references("id")
      .inTable("npcs")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("notes-npcs");
};
